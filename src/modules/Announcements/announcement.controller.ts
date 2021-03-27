/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Announcement Controller
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import 'reflect-metadata';
import {
  Controller,
  Post,
  Get,
  Put,
  Res,
  Body,
  UseInterceptors,
  HttpStatus,
  Param
} from '@nestjs/common';
import { Discussions } from '../../database/entity/channelDiscussion';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';
import { LoggerService } from '../../shared/services/logger.service';
import { CacheInterceptor } from '../../interceptors/cache.interceptor';
import { RedisService } from '../../shared/services/redis.service';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { CacheExpiration } from '../../decorators/cache-expiration.decorators';
import { Timeout } from '../../decorators/timeout.decorator';

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
  async getAnnouncement(@Param('id') announcementId: number, @Res() res: any) {
    try {
      const announcement = await this.AnnouncementService.findById(
        announcementId
      );
      if (!announcement) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Announcement with that id does not exist'
        });
        this.Logger.error('Error in Database Transaction');
      } else {
        res.status(HttpStatus.OK).json({
          announcement
        });
        this.Logger.info('fetch successful');
      }
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error'
      });
      this.Logger.error(e);
    }
  }

  @Get('get/channel/:id')
  @CacheExpiration(15)
  @UseInterceptors(CacheInterceptor)
  async getAllAnnouncements(@Param('id') channelId: number, @Res() res: any) {
    try {
      const announcements = await this.AnnouncementService.findByChannel(
        channelId
      );
      if (announcements && announcements.length !== 0) {
        res.status(HttpStatus.OK).json({
          announcements
        });
        this.Logger.info('fetch successful');
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'No announcement for this channel or Channel does not exist'
        });
        this.Logger.error('Error in Database Transaction');
      }
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error'
      });
      this.Logger.error(e);
    }
  }

  @Post('add')
  @CacheExpiration(15)
  @UseInterceptors(CacheInterceptor)
  async addAnnouncement(
    @Body() announcementData: CreateAnnouncementDto,
    @Res() res: any
  ) {
    try {
      const newAnnouncement = Discussions.create({
        ...announcementData,
        isAnnouncement: true
      });
      const announcement = await this.AnnouncementService.createAnnouncement(
        newAnnouncement
      );
      if (!announcement) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Internal Database Error'
        });
        this.Logger.error('Error in Database Transaction');
      } else {
        res.status(HttpStatus.OK).json({
          message: 'Announcement posted successfully',
          announcement
        });
        this.Logger.info('Announcement created successfully');
      }
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error'
      });
      this.Logger.error(e);
    }
  }

  @Put('update/:id')
  @CacheExpiration(15)
  @UseInterceptors(CacheInterceptor)
  async updateAnnouncement(
    @Param('id') announcementId: number,
    @Body() announcementData: UpdateAnnouncementDto,
    @Res() res: any
  ) {
    try {
      const announcement = await this.AnnouncementService.updateAnnouncement(
        announcementId,
        announcementData
      );
      if (!announcement) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Announcement with that id does not exist'
        });
        this.Logger.error('Error in Database Transaction');
      } else {
        res.status(HttpStatus.OK).json({
          message: 'Announcement updated successfully',
          announcement
        });
        this.Logger.info('Announcement updated successfully');
      }
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error'
      });
      this.Logger.error(e);
    }
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
