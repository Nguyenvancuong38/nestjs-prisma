import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductSampleService } from './product-sample.service';
import { CreateProductSampleDto } from './dto/create-product-sample.dto';
import { UpdateProductSampleDto } from './dto/update-product-sample.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Product-sample')
@ApiBearerAuth('access-token')
@Controller('v1/product-sample')
export class ProductSampleController {
  constructor(private readonly productSampleService: ProductSampleService) {}

  @Post()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  create(@Body() createProductSampleDto: CreateProductSampleDto, @CurrentUser() currentUser: User) {
    return this.productSampleService.create(createProductSampleDto, currentUser);
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
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProductSampleDto: UpdateProductSampleDto, @CurrentUser() currentUser: User) {
    return this.productSampleService.update(+id, updateProductSampleDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productSampleService.remove(+id);
  }
}
