import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequestProductSampleService } from './request-product-sample.service';
import { CreateRequestProductSampleDto } from './dto/create-request-product-sample.dto';
import { UpdateRequestProductSampleDto } from './dto/update-request-product-sample.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Request-product-sample')
@ApiBearerAuth('access-token')
@Controller('v1/request-product-sample')
export class RequestProductSampleController {
  constructor(private readonly requestProductSampleService: RequestProductSampleService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRequestProductSampleDto: CreateRequestProductSampleDto) {
    return this.requestProductSampleService.create(createRequestProductSampleDto);
  }

  @Get()
  findAll() {
    return this.requestProductSampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestProductSampleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateRequestProductSampleDto: UpdateRequestProductSampleDto, @CurrentUser() currentUser: User) {
    return this.requestProductSampleService.update(+id, updateRequestProductSampleDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.requestProductSampleService.remove(+id, currentUser);
  }
}
