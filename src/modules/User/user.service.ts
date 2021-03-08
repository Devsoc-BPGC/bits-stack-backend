import { getCustomRepository, Repository } from 'typeorm';
import { Users, UserRole } from '../../database/entity/user';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserRepository } from './user.repository';
import { RedisService } from '../../shared/services/redis.service';

@Injectable()
export class UserService {
	private userRepo: UserRepository;

	constructor(private readonly cache: RedisService) {
		this.userRepo = getCustomRepository(UserRepository);
	}

	@Transactional()
    async createUser(user: Users): Promise<Users> {
		return await this.userRepo.save(user);
	}

	@Transactional()
    async findByEmail(email: string): Promise<Users|undefined> {
		return await this.userRepo.findOne({email: email});
	}
}
