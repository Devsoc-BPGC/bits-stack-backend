/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Added Announcement Module in imports
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { HttpMiddleware } from './middlewares/global/Http';
import { RequestLogger } from './middlewares/global/RequestLogger';
import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/User/user.modules';
import { AnnouncementModule } from './modules/Announcements/announcement.modules';
import { ServiceModule } from './shared/services.module';

@Module({
  imports: [UserModule, AuthModule, ServiceModule, AnnouncementModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        RequestLogger,
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        HttpMiddleware
      )
      .forRoutes('*');
  }
}
