/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Discussion Module
 *
 * @author Devesh
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '../../shared/services/config.service';
import { LoggerService } from '../../shared/services/logger.service';
import { RedisService } from '../../shared/services/redis.service';
import { DiscussionController } from './discussion.controller';
import { DiscussionRepository } from './discussion.repository';
import { DiscussionService } from './discussion.service';

@Module({
	controllers: [DiscussionController],
	providers: [DiscussionService, DiscussionRepository, LoggerService, RedisService, ConfigService],
	exports: [DiscussionService]
})
export class DiscussionModule implements NestModule {
	// Configure the middlewares here
	configure(consumer: MiddlewareConsumer) {
		/* consumer.apply(Cache).forRoutes('*'); */
	}
}
