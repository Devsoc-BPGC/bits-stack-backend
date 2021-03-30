/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Discussion Service
 *
 * @author Devesh 
 */

import { getCustomRepository } from 'typeorm';
import { Discussions } from '../../database/entity/channelDiscussion';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { DiscussionRepository } from './discussion.repository';
import { RedisService } from '../../shared/services/redis.service';
import { UpdateDiscussionDto } from './dto';


@Injectable()
export class DiscussionService {
	private DiscussionRepo: DiscussionRepository;

	constructor(private readonly cache: RedisService) {
		this.DiscussionRepo = getCustomRepository(DiscussionRepository);
	}

	@Transactional()
	async createDiscussion(Discussion: Discussions): Promise<Discussions> {
		return await this.DiscussionRepo.save(Discussion);
	}

	@Transactional()
	async findByChannel(Channel_ID: number): Promise<Discussions[] | undefined> {
		return await this.DiscussionRepo.find({
			Channel_ID: Channel_ID
		});
	}


	@Transactional()
	async findById(DiscussionId: number): Promise<Discussions> {
		const Discussion = await this.DiscussionRepo.findOne({
			message_ID: DiscussionId
		});
		if (!Discussion) {
			throw new NotFoundException();
		} else {
			return Discussion;
		}
	}

	@Transactional()
	async updateDiscussion(
		DiscussionId: number,
		Discussion: UpdateDiscussionDto
	): Promise<Discussions | undefined> {
		await this.DiscussionRepo.update(DiscussionId, Discussion);
		return await this.findById(DiscussionId);
	}

	@Transactional()
	async deleteDiscussion(DiscussionId: number): Promise<Object | undefined> {
		const delRes = await this.DiscussionRepo.delete({ message_ID: DiscussionId });
		if (delRes.affected) {
			return {
				message: `Discussion with id ${DiscussionId} has been deleted`
			};
		} else {
			throw new InternalServerErrorException();
		}
	}
}
