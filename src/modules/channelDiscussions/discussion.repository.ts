/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author Devesh
 *
 * @description Refactored the import of Discussions
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Discussions } from '../../database';

@EntityRepository(Discussions)
export class DiscussionRepository extends Repository<Discussions> {}
