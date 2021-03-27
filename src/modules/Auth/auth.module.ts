import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '../../shared/services/config.service';
import { LoggerService } from '../../shared/services/logger.service';
import { RedisService } from '../../shared/services/redis.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [
        ConfigService,
        LoggerService,
        RedisService,
        AuthService
    ],
    exports: [AuthService]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // Configure middleware here
    }
}
