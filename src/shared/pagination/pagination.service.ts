import { PaginationDto } from './pagination.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PaginationService {
	skippedItems(paginationDto: PaginationDto) {
		const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
		return skippedItems;
	}
}
