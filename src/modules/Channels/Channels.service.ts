/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Channels Service
 *
 * @author Devesh
 */

import { getCustomRepository } from 'typeorm';
import { Channels } from '../../database';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ChannelsRepository } from './Channels.repository';
import { RedisService } from '../../shared/services/redis.service';
import { UpdateChannelsDto } from './dto/update-Channels.dto';

@Injectable()
export class ChannelsService {
	private ChannelsRepo: ChannelsRepository;

	constructor(private readonly cache: RedisService) {
		this.ChannelsRepo = getCustomRepository(ChannelsRepository);
	}

	@Transactional()
	async createChannels(Channel: Channels): Promise<Channels> {
		return await this.ChannelsRepo.save(Channel);
	}

	@Transactional()
	async findById(ChannelsId: number): Promise<Channels> {
		const Channels = await this.ChannelsRepo.findOne({
			id: ChannelsId
		});
		if (!Channels) {
			throw new NotFoundException();
		} else {
			return Channels;
		}
	}

	@Transactional()
	async updateChannels(ChannelsId: number, Channels: UpdateChannelsDto): Promise<Channels | undefined> {
		try {
			const postRes = await this.ChannelsRepo.update(ChannelsId, Channels);
			if (postRes.affected === 0) {
				throw new NotFoundException();
			}
			return await this.findById(ChannelsId);
		} catch (e) {
			throw e;
		}
	}

	@Transactional()
	async deleteChannels(ChannelsId: number): Promise<Object | undefined> {
		try {
			const delRes = await this.ChannelsRepo.delete({ id: ChannelsId });
			if (delRes.affected === 0) {
				throw new NotFoundException();
			} else {
				return {
					message: `Channels with id ${ChannelsId} has been deleted`
				};
			}
		} catch (e) {
			throw e;
		}
	}
}
