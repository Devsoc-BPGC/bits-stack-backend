/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Announcement Service
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { getCustomRepository } from 'typeorm';
import { Discussions } from '../../database/entity/channelDiscussion';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AnnouncementRepository } from './announcement.repository';
import { RedisService } from '../../shared/services/redis.service';
import { UpdateAnnouncementDto } from './dto';

@Injectable()
export class AnnouncementService {
	private announcementRepo: AnnouncementRepository;

	constructor(private readonly cache: RedisService) {
		this.announcementRepo = getCustomRepository(AnnouncementRepository);
	}

	@Transactional()
	async createAnnouncement(announcement: Discussions): Promise<Discussions> {
		return await this.announcementRepo.save(announcement);
	}

	@Transactional()
	async findByChannel(Channel_ID: number): Promise<Discussions[] | undefined> {
		return await this.announcementRepo.find({
			Channel_ID: Channel_ID,
			isAnnouncement: true
		});
	}

	@Transactional()
	async findById(announcementId: number): Promise<Discussions> {
		const announcement = await this.announcementRepo.findOne({
			ID: announcementId,
			isAnnouncement: true
		});
		if (!announcement) {
			throw new NotFoundException();
		} else {
			return announcement;
		}
	}

	@Transactional()
	async updateAnnouncement(
		announcementId: number,
		announcement: UpdateAnnouncementDto
	): Promise<Discussions | undefined> {
		await this.findById(announcementId);
		await this.announcementRepo.update(announcementId, announcement);
		return await this.findById(announcementId);
	}

	@Transactional()
	async deleteAnnouncement(announcementId: number): Promise<Object | undefined> {
		await this.findById(announcementId);
		await this.announcementRepo.delete({ ID: announcementId });
		const announcement = await this.announcementRepo.findOne({
			ID: announcementId
		});
		if (!announcement) {
			return {
				message: `Announcement with id ${announcementId} has been deleted`
			};
		} else {
			throw new InternalServerErrorException();
		}
	}
}
