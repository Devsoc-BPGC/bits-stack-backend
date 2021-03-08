/* eslint-disable @typescript-eslint/no-explicit-any */
import * as redis from 'ioredis';
import { createPool, Pool, Factory } from 'generic-pool';
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

// Add additional cache methods here
@Injectable()
export class RedisService {
	// protected redisclient?: redis.Redis;
	protected myredisPool: Pool<redis.Redis>;
	private factory: Factory<redis.Redis>;

	constructor (private configservice: ConfigService) {
		this.factory = {
			create: async function() {
				return new redis({ port: configservice.redis.port, host: configservice.redis.host });
			},
			destroy: async function(client) {
				client.quit();
			}
		};
		this.myredisPool = createPool(this.factory, { max: 1 });
	}

	public getValue(key: string): Promise<string | null> {
		return new Promise((resolve, reject) => {
			const redisPromise = this.myredisPool.acquire();
			redisPromise.then(client => {
				client.get(key, (err, value) => {
					if (err) {
						return reject('Client unable to get cache\n' + err);
					}
					return resolve(value);
				});
				this.myredisPool.release(client).then(() => {
					// Client is released.
					return;
				}, err => {
					this.myredisPool.drain().then(() => {
						this.myredisPool.clear();
					});
					return reject('Need to restart pool! Pool has been drained and cleared.\n' + err);
				});
			}, err => {
				return reject('Unable to acquire client\n' + err);
			});
		});
	}

	public setValue(key: string, value: string, expiration?: number): Promise<string> {
		return new Promise((resolve, reject) => {
			const redisPromise = this.myredisPool.acquire();
			redisPromise.then(client => {
				if (expiration) {
					client.setex(key, expiration, value, (err => {
						if (err) {
							return reject('Client unable to get cache\n' + err);
						}
						return resolve(value);
					}));
				} else {
					client.set(key, value, (err => {
						if (err) {
							console.log(err);
							reject(err);
						}
						return resolve(value);
					}));
				}
				this.myredisPool.release(client).then(() => {
					// Client released.
					return;
				}, err => {
					this.myredisPool.drain().then(() => {
						this.myredisPool.clear();
					});
					return reject('Need to restart pool! Pool has been drained and cleared.\n' + err);
				});
				return;
			}, err => {
				return reject('Unable to acquire client\n' + err);
			});
		});
	}
}

