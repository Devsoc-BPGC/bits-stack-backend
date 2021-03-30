/**
 * Created Users Service
 *
 * @author Ritvij <ritvij2001@gmail.com>
 */

import { getCustomRepository, Repository } from 'typeorm';
import { Users, UserRole } from '../../database/entity/user';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserRepository } from './user.repository';
import { RedisService } from '../../shared/services/redis.service';

@Injectable()
export class UserService {
	private userRepo: UserRepository;

	@Transactional()
	private async findById(userID: number): Promise<Users> {
		const user = await this.userRepo.findOne({
			id: userID
		});
		if (!user) {
			throw new NotFoundException();
		} else {
			return user;
		}
	}

	constructor(private readonly cache: RedisService) {
		this.userRepo = getCustomRepository(UserRepository);
	}

	@Transactional()
	async createUser(user: Users): Promise<Users> {
		return await this.userRepo.save(user);
	}

	@Transactional()
	async updateUser(userID: number, user: Users): Promise<Users | undefined> {
		try {
			await this.findById(userID);
		} catch (e) {
			throw e;
		}
		await this.userRepo.update(userID, user);
		return await this.findById(userID);
	}

	@Transactional()
	async getUser(userID: number) {
		try {
			return await this.findById(userID);
		} catch (e) {
			throw e;
		}
	}

	@Transactional()
	async deleteUser(userID: number): Promise<Object | undefined> {
		try {
			const delRes = await this.userRepo.delete(userID);
			if (delRes.affected === 0) {
				throw new NotFoundException();
			}
			return {
				message: `User with id ${userID} has been deleted`
			};
		} catch (e) {
			throw e;
		}
	}
}
