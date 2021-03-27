/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Announcement Module
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '../../shared/services/config.service';
import { LoggerService } from '../../shared/services/logger.service';
import { RedisService } from '../../shared/services/redis.service';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementRepository } from './announcement.repository';
import { AnnouncementService } from './announcement.service';

@Module({
  controllers: [AnnouncementController],
  providers: [
    AnnouncementService,
    AnnouncementRepository,
    LoggerService,
    RedisService,
    ConfigService
  ],
  exports: [AnnouncementService]
})
export class AnnouncementModule implements NestModule {
  // Configure User middlewares here
  configure(consumer: MiddlewareConsumer) {
    /* consumer.apply(Cache).forRoutes('*'); */
  }
}
