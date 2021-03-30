/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Discussion Repository
 *
 * @author Devesh 
 */

import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Discussions } from '../../database/entity/channelDiscussion';

@EntityRepository(Discussions)
export class DiscussionRepository extends Repository<Discussions> {}
