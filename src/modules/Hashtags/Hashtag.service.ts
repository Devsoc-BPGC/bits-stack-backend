/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Hashtag Service
 *
 * @author Devesh
 */

import { getCustomRepository } from 'typeorm';
import { Hashtags } from '../../database/entity/hashtag';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { HashtagRepository } from './Hashtag.repository';
import { RedisService } from '../../shared/services/redis.service';
import { UpdateHashtagDto } from './dto';

@Injectable()
export class HashtagService {
	private HashtagRepo: HashtagRepository;

	constructor(private readonly cache: RedisService) {
		this.HashtagRepo = getCustomRepository(HashtagRepository);
	}

	@Transactional()
	async createHashtag(Hashtag: Hashtags): Promise<Hashtags> {
		return await this.HashtagRepo.save(Hashtag);
	}

	@Transactional()
	async findById(HashtagId: number): Promise<Hashtags> {
		const Hashtag = await this.HashtagRepo.findOne({
			id: HashtagId
		});
		if (!Hashtag) {
			throw new NotFoundException();
		} else {
			return Hashtag;
		}
	}

	@Transactional()
	async updateHashtag(HashtagId: number, Hashtag: UpdateHashtagDto): Promise<Hashtags | undefined> {
		try {
			const postRes = await this.HashtagRepo.update(HashtagId, Hashtag);
			if (postRes.affected === 0) {
				throw new NotFoundException();
			}
			return await this.findById(HashtagId);
		} catch (e) {
			throw e;
		}
	}

	@Transactional()
	async deleteHashtag(HashtagId: number): Promise<Object | undefined> {
		try {
			const delRes = await this.HashtagRepo.delete({ id: HashtagId });
			if (delRes.affected === 0) {
				throw new NotFoundException();
			} else {
				return {
					message: `Hashtag with id ${HashtagId} has been deleted`
				};
			}
		} catch (e) {
			throw e;
		}
	}
}
