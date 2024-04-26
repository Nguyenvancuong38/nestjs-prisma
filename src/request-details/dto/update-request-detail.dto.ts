import { PartialType } from '@nestjs/swagger';
import { CreateRequestDetailDto } from './create-request-detail.dto';

export class UpdateRequestDetailDto extends PartialType(CreateRequestDetailDto) {}
