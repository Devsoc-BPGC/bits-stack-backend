import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';
import { RedisService } from './redis.service';

@Global()
@Module({
	providers: [LoggerService, RedisService, ConfigService],
	exports: [LoggerService, RedisService, ConfigService]
})
export class ServiceModule {}
