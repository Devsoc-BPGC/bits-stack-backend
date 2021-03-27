/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Announcement Service
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { getCustomRepository } from 'typeorm';
import { Discussions } from '../../database/entity/channelDiscussion';
import { Injectable } from '@nestjs/common';
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
  async findById(announcementId: number): Promise<Discussions | undefined> {
    return await this.announcementRepo.findOne({ message_ID: announcementId });
  }

  @Transactional()
  async updateAnnouncement(
    announcementId: number,
    announcement: UpdateAnnouncementDto
  ): Promise<Discussions | undefined> {
    await this.announcementRepo.update(announcementId, announcement);
    return await this.announcementRepo.findOne({ message_ID: announcementId });
  }

  @Transactional()
  async deleteAnnouncement(
    announcementId: number
  ): Promise<Discussions | undefined> {
    let x = await this.announcementRepo.delete({ message_ID: announcementId });
    console.log(x);
    return await this.announcementRepo.findOne({ message_ID: announcementId });
  }

  // @Transactional()
  // async createUser(user: Users): Promise<Users> {
  // 	return await this.announcementRepo.save(user);
  // }

  // @Transactional()
  // async findByEmail(email: string): Promise<Users|undefined> {
  // 	return await this.announcementRepo.findOne({email: email});
  // }
}
