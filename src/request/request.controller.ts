import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from '@prisma/client';

@Controller('v1/request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get('/productId/:productId')
  @UseGuards(AuthGuard)
  findByProductId(@Param('productId') productId: string) {
    return this.requestService.findByProductId(+productId);
  }

  @Get()
  findAll() {
    return this.requestService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(+id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto, @CurrentUser() currentUser: User) {
    return this.requestService.update(+id, updateRequestDto, currentUser);
  }

  @Delete('/:id')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
