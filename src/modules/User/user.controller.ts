import 'reflect-metadata';
import { Controller, Post, Get, Req, Body, UseInterceptors, Res, HttpStatus, Param, InternalServerErrorException } from '@nestjs/common';
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
    async createUser(@Res() res: any, @Body() user: CreateUserDto) {
        try {
            const newUser = await this.UserService.createUser(user);
            res.status(HttpStatus.OK).json({
                message: 'User has been created successfully!',
                newUser
            });
            this.Logger.info('New user created');
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'User creation unsuccessful...'
            });
            this.Logger.info('Error in user creation');
        }
        // this.UserService.createUser(newuser);
    }

    @Post('update/:id')
    @CacheExpiration(15)
    @UseInterceptors(CacheInterceptor)
    async updateUser(@Res() res: any, @Param('id') userID: number, @Body() user: CreateUserDto) {
        try {
            const updatedUser = await this.UserService.updateUser(userID, user);
            res.status(HttpStatus.OK).json({
                message: 'User has been updated',
                updatedUser
            });
            this.Logger.info('Update successful');
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Update unsuccessful...'
            });
            this.Logger.info('Update unsuccessful');
        }
    }

    @Get('get/:id')
    @CacheExpiration(15)
    @UseInterceptors(CacheInterceptor)
    async getUser(@Param('id') userID: number, @Res() res: any) {
        try {
            const user = await this.UserService.getUser(userID);
            res.status(HttpStatus.OK).json({
                user
            });
            this.Logger.info('user fetch success');
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Unsuccessful...'
            });
            this.Logger.info('fetch unsuccessful');
        }
    }

    private async delay(delayInms: number) {
        return new Promise(resolve => {
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
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
