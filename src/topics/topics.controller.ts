import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from '@prisma/client';

@Controller('v1/topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTopicDto: CreateTopicDto, @CurrentUser() currentUser: User) {
    return this.topicsService.create(createTopicDto, currentUser);
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto, @CurrentUser() currentUser: User) {
    return this.topicsService.update(+id, updateTopicDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.topicsService.remove(+id, currentUser);
  }

  @Get('productId/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.topicsService.findByProduct(+productId);
  }
}
