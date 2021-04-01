/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Channels Module
 *
 * @author Devesh
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '../../shared/services/config.service';
import { LoggerService } from '../../shared/services/logger.service';
import { RedisService } from '../../shared/services/redis.service';
import { ChannelsController } from './Channels.controller';
import { ChannelsRepository } from './Channels.repository';
import { ChannelsService } from './Channels.service';

@Module({
	controllers: [ChannelsController],
	providers: [ChannelsService, ChannelsRepository, LoggerService, RedisService, ConfigService],
	exports: [ChannelsService]
})
export class ChannelsModule implements NestModule {
	// Configure the middlewares to be used here
	configure(consumer: MiddlewareConsumer) {
		/* consumer.apply(Cache).forRoutes('*'); */
	}
}
