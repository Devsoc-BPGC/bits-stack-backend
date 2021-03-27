import 'reflect-metadata';
import { Controller, Post, Get, Req, Body, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import { Users } from '../../database/entity/user';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggerService } from '../../shared/services/logger.service';
import { CacheInterceptor } from '../../interceptors/cache.interceptor';
import { RedisService } from '../../shared/services/redis.service';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { CacheExpiration } from '../../decorators/cache-expiration.decorators';
import { Timeout } from '../../decorators/timeout.decorator';
import { AuthService } from '../Auth/auth.service';
import { google } from 'googleapis';

@Controller('user')
export class UserController {
    constructor(
        private readonly UserService: UserService,
        private readonly AuthService: AuthService,
        private Logger: LoggerService,
        private cache: RedisService
    ) { }

    @Post('create')
    @CacheExpiration(15)
    @UseInterceptors(CacheInterceptor)
	add(@Body() user: CreateUserDto): Users {
        const newuser = Users.create({
            name: user.name,
            email: user.email
        });
        // this.UserService.createUser(newuser);
        this.Logger.info('New user created');
        return newuser;
    }

    @Get('get')
    get(@Req() req: Request) {
        console.log(req);
        return req;
    }

    @Post('add')
    create(@Req() user: Request): string {
        console.log(user);
        return 'New user created';
    }

    private async delay(delayInms: number) {
        return new Promise(resolve  => {
          setTimeout(() => {
            resolve(2);
          }, delayInms);
        });
    }

    @Get('timeout')
    @Timeout(3000)
    @UseInterceptors(TimeoutInterceptor)
    async timeout(): Promise<void> {
        await this.delay(5000);
        return;
    }

    @Get('drive/add')
    async drivecreate() {
        try {
            const auth = await this.AuthService.getauthenticatedClient(['https://www.googleapis.com/auth/drive.file']);
            const drive = google.drive({ version: 'v3', auth: auth });
            await drive.files.create({
                requestBody: {
                name: 'Test',
                mimeType: 'text/plain'
                },
                media: {
                mimeType: 'text/plain',
                body: 'Hello World'
                }
            });
            return 'OK';
        } catch(e) {
            throw new InternalServerErrorException();
        }
    }
}
