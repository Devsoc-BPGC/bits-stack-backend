import { NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler) {
        const requestTimeout = this.reflector.get<number>('timeout', context.getHandler()) || 4000;

        return next.handle().pipe(
            timeout(requestTimeout),
            catchError(err => throwError(new RequestTimeoutException()))
        );
    }
}
