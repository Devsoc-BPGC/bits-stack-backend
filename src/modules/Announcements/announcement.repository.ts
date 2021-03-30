/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Announcement Repository
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Discussions } from '../../database/entity/channelDiscussion';

@EntityRepository(Discussions)
export class AnnouncementRepository extends Repository<Discussions> {}
