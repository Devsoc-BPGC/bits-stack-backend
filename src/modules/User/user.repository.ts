import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../../database/entity/user';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}
