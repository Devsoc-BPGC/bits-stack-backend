import { Global, Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PaginationDto } from './pagination.dto';

@Global()
@Module({
	providers: [PaginationService, PaginationDto],
	exports: [PaginationService, PaginationDto]
})
export class PaginationModule {}
