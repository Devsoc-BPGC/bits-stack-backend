/**
 * @description Updated the pipe to allow implicit conversion
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value, { enableImplicitConversion: true });
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException('Validation failed');
		}
		return object;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
