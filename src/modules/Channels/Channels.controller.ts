/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Channels Controller
 *
 * @author Devesh
 */

import 'reflect-metadata';
import { Controller, Post, Get, Put, Delete, Body, UseInterceptors, Param, UseFilters, UsePipes } from '@nestjs/common';
import { Channels } from '../../database';
import { ChannelsService } from './Channels.service';
import { CreateChannelsDto, UpdateChannelsDto } from './dto';
import { LoggerService } from '../../shared/services/logger.service';
import { CacheInterceptor } from '../../interceptors/cache.interceptor';
import { RedisService } from '../../shared/services/redis.service';
import { UndefinedInterceptor } from '../../interceptors/undefined.interceptor';
import { CacheExpiration } from '../../decorators/cache-expiration.decorators';
import { QueryFailedFilter } from '../../filters/queryfailed.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';

// Controller for Channels
@Controller('Channels')
export class ChannelsController {
	constructor(
		private readonly ChannelsService: ChannelsService,
		private Logger: LoggerService,
		private cache: RedisService
	) {}

	// method to get it by id
	@Get('get/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor)
	@UseFilters(new QueryFailedFilter())
	async getChannels(@Param('id') ChannelsId: number) {
		const Channels = await this.ChannelsService.findById(ChannelsId);
		console.log(Channels);
		return Channels ? { Channels } : Channels;
	}

	// method to add a Channel
	@Post('add')
	@UsePipes(ValidationPipe)
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async addChannels(@Body() ChannelsData: CreateChannelsDto) {
		const newChannel = Channels.create({
			channel_Name: ChannelsData.channel_Name,
			channel_Mod: ChannelsData.channel_Mod
		});
		const Channel = await this.ChannelsService.createChannels(newChannel);
		return Channel ? { Channel } : Channel;
	}

	// method to update it by id
	@Put('update/:id')
	@UsePipes(ValidationPipe)
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async updateChannels(@Param('id') ChannelsId: number, @Body() ChannelsData: UpdateChannelsDto) {
		const Channels = await this.ChannelsService.updateChannels(ChannelsId, ChannelsData);
		return Channels ? { Channels } : Channels;
	}

	// method to delete it by id
	@Delete('delete/:id')
	@CacheExpiration(15)
	@UseInterceptors(CacheInterceptor, UndefinedInterceptor)
	@UseFilters(new QueryFailedFilter())
	async deleteChannels(@Param('id') ChannelsId: number) {
		const message = await this.ChannelsService.deleteChannels(ChannelsId);
		return message;
	}
}
