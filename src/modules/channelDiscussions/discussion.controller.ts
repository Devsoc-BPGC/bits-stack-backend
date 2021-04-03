/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @description Documented the OK responses
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import 'reflect-metadata';
import { Controller, Post, Get, Put, Delete, Body, UseInterceptors, Param, UseFilters, UsePipes } from '@nestjs/common';
import { Discussions } from '../../database';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto, UpdateDiscussionDto } from './dto';
import { LoggerService } from '../../shared/services/logger.service';
import { CacheInterceptor } from '../../interceptors/cache.interceptor';
import { RedisService } from '../../shared/services/redis.service';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { UndefinedInterceptor } from '../../interceptors/undefined.interceptor';
import { CacheExpiration } from '../../decorators/cache-expiration.decorators';
import { Timeout } from '../../decorators/timeout.decorator';
import { QueryFailedFilter } from '../../filters/queryfailed.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiOkResponse } from '@nestjs/swagger';

// Controller for discussions
@Controller('discussions')
export class DiscussionController {
	constructor(
		private readonly DiscussionService: DiscussionService,
		private Logger: LoggerService,
		private cache: RedisService
	) {}

	// method to get it by id
	@ApiOkResponse({ description: 'Discussion fetch Successful' })
	@Get('get/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor)
	@UseFilters(new QueryFailedFilter())
	async getDiscussion(@Param('id') DiscussionId: number) {
		const Discussion = await this.DiscussionService.findById(DiscussionId);
		console.log(Discussion);
		return Discussion ? { Discussion } : Discussion;
	}

	// method to get it by channel id
	@ApiOkResponse({ description: 'Discussions fetch Successful' })
	@Get('get/channel/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	// @UseFilters(new QueryFailedFilter())
	async getAllDiscussions(@Param('id') channelId: number) {
		const Discussions = await this.DiscussionService.findByChannel(channelId);
		return Discussions ? { Discussions } : Discussions;
	}

	// method to add a Discussion
	@ApiOkResponse({ description: 'Discussion added successfully' })
	@Post('add')
	@UsePipes(ValidationPipe)
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async addDiscussion(@Body() DiscussionData: CreateDiscussionDto) {
		console.log(DiscussionData);
		const newDiscussion = Discussions.create({
			title: DiscussionData.title,
			content: DiscussionData.content,
			Channel_ID: DiscussionData.Channel_ID,
			tags: DiscussionData.tags,
			isAnnouncement: DiscussionData.isAnnouncement || false,
			files_image: DiscussionData.files_image
		});
		const Discussion = await this.DiscussionService.createDiscussion(newDiscussion);
		return Discussion ? { Discussion } : Discussion;
	}

	// method to update it by id
	@ApiOkResponse({ description: 'Discussion updated successfully' })
	@Put('update/:id')
	@UsePipes(ValidationPipe)
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async updateDiscussion(@Param('id') DiscussionId: number, @Body() DiscussionData: UpdateDiscussionDto) {
		const Discussion = await this.DiscussionService.updateDiscussion(DiscussionId, DiscussionData);
		return Discussion ? { Discussion } : Discussion;
	}

	// method to delete it by id
	@ApiOkResponse({ description: 'Discussion deleted successfully' })
	@Delete('delete/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async deleteDiscussion(@Param('id') DiscussionId: number) {
		const message = await this.DiscussionService.deleteDiscussion(DiscussionId);
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
