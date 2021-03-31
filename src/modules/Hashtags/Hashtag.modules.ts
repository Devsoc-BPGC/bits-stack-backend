/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Hashtag Module
 *
 * @author Devesh
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '../../shared/services/config.service';
import { LoggerService } from '../../shared/services/logger.service';
import { RedisService } from '../../shared/services/redis.service';
import { HashtagController } from './Hashtag.controller';
import { HashtagRepository } from './Hashtag.repository';
import { HashtagService } from './Hashtag.service';

@Module({
	controllers: [HashtagController],
	providers: [HashtagService, HashtagRepository, LoggerService, RedisService, ConfigService],
	exports: [HashtagService]
})
export class HashtagModule implements NestModule {
	// Configure the middlewares to be used here
	configure(consumer: MiddlewareConsumer) {
		/* consumer.apply(Cache).forRoutes('*'); */
	}
}
