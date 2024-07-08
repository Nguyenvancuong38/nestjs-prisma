import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductSampleService } from './product-sample.service';
import { CreateProductSampleDto } from './dto/create-product-sample.dto';
import { UpdateProductSampleDto } from './dto/update-product-sample.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('v1/product-sample')
export class ProductSampleController {
  constructor(private readonly productSampleService: ProductSampleService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductSampleDto: CreateProductSampleDto) {
    return this.productSampleService.create(createProductSampleDto);
  }

  @Get()
  findAll() {
    return this.productSampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSampleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSampleDto: UpdateProductSampleDto) {
    return this.productSampleService.update(+id, updateProductSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSampleService.remove(+id);
  }
}
