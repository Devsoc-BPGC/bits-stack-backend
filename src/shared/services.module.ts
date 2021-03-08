import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { LoggerService } from './services/logger.service';
import { RedisService } from './services/redis.service';

@Global()
@Module({
    providers: [LoggerService, RedisService, ConfigService],
    exports: [LoggerService, RedisService, ConfigService]
})
export class ServiceModule {}
