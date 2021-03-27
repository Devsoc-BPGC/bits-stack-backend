import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '../../shared/services/config.service';
import { LoggerService } from '../../shared/services/logger.service';
import { RedisService } from '../../shared/services/redis.service';
import { AuthModule } from '../Auth/auth.module';
import { AuthService } from '../Auth/auth.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [AuthModule],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
        LoggerService,
        RedisService,
        ConfigService,
        AuthService
    ],
    exports: [UserService]
})
export class UserModule implements NestModule {
    // Configure User middlewares here
    configure(consumer: MiddlewareConsumer) {
        /* consumer.apply(Cache).forRoutes('*'); */
    }
}
