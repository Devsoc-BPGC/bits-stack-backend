import { SetMetadata } from '@nestjs/common';

export const Timeout = (timeout: number) => SetMetadata('timeout', timeout);
