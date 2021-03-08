import { SetMetadata } from '@nestjs/common';

export const CacheExpiration = (expiration: number) => SetMetadata('expiration', expiration);
