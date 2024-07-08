import { PartialType } from '@nestjs/swagger';
import { CreateProductSampleDto } from './create-product-sample.dto';

export class UpdateProductSampleDto extends PartialType(CreateProductSampleDto) {}
