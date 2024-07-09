import { PartialType } from '@nestjs/swagger';
import { CreateRequestProductSampleDto } from './create-request-product-sample.dto';

export class UpdateRequestProductSampleDto extends PartialType(CreateRequestProductSampleDto) {}
