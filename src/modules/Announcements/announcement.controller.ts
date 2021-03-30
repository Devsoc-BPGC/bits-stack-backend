/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Announcement Controller
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import 'reflect-metadata';
import { Controller, Post, Get, Put, Delete, Body, UseInterceptors, Param, UseFilters } from '@nestjs/common';
import { Discussions } from '../../database/entity/channelDiscussion';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import { LoggerService } from '../../shared/services/logger.service';
import { CacheInterceptor } from '../../interceptors/cache.interceptor';
import { RedisService } from '../../shared/services/redis.service';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { UndefinedInterceptor } from '../../interceptors/undefined.interceptor';
import { CacheExpiration } from '../../decorators/cache-expiration.decorators';
import { Timeout } from '../../decorators/timeout.decorator';
import { QueryFailedFilter } from '../../filters/queryfailed.filter';

@Controller('announcements')
export class AnnouncementController {
	constructor(
		private readonly AnnouncementService: AnnouncementService,
		private Logger: LoggerService,
		private cache: RedisService
	) {}

	@Get('get/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor)
	@UseFilters(new QueryFailedFilter())
	async getAnnouncement(@Param('id') announcementId: number) {
		const announcement = await this.AnnouncementService.findById(announcementId);
		console.log(announcement);
		return announcement ? { announcement } : announcement;
	}

	@Get('get/channel/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	// @UseFilters(new QueryFailedFilter())
	async getAllAnnouncements(@Param('id') channelId: number) {
		const announcements = await this.AnnouncementService.findByChannel(channelId);
		return announcements ? { announcements } : announcements;
	}

	@Post('add')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async addAnnouncement(@Body() announcementData: CreateAnnouncementDto) {
		const newAnnouncement = Discussions.create({
			...announcementData,
			isAnnouncement: true
		});
		const announcement = await this.AnnouncementService.createAnnouncement(newAnnouncement);
		return announcement ? { announcement } : announcement;
	}

	@Put('update/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async updateAnnouncement(@Param('id') announcementId: number, @Body() announcementData: UpdateAnnouncementDto) {
		const announcement = await this.AnnouncementService.updateAnnouncement(announcementId, announcementData);
		return announcement ? { announcement } : announcement;
	}

	@Delete('delete/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async deleteAnnouncement(@Param('id') announcementId: number) {
		const message = await this.AnnouncementService.deleteAnnouncement(announcementId);
		return message;
	}

	private async delay(delayInms: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(2);
			}, delayInms);
		});
	}

	@Get('timeout')
	@Timeout(3000)
	@UseInterceptors(TimeoutInterceptor)
	async timeout(): Promise<void> {
		await this.delay(5000);
		return;
	}
}
