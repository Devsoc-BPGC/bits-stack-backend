/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Interceptor to catch undefined and null responses
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class UndefinedInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse();
    return next.handle().pipe(
      tap((val) => {
        if (!val) {
          res.status(HttpStatus.NOT_FOUND).json({
            message: 'Entity not found'
          });
        } else {
          return val;
        }
      })
    );
  }
}
