/**
 * @description Refactored the import of Users
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../../database';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}
