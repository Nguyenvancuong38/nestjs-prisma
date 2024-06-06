import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TopicSubService } from './topic-sub.service';
import { CreateTopicSubDto } from './dto/create-topic-sub.dto';
import { UpdateTopicSubDto } from './dto/update-topic-sub.dto';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('v1/topic-sub')
export class TopicSubController {
  constructor(private readonly topicSubService: TopicSubService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTopicSubDto: CreateTopicSubDto, @CurrentUser() currentUser: User) {
    return this.topicSubService.create(createTopicSubDto, currentUser);
  }

  @Get()
  findAll() {
    return this.topicSubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicSubService.findOne(+id);
  }

  @Get('/topicId/:topicId')
  @UseGuards(AuthGuard)
  findTopicSubByTopicId(@Param('topicId') topicId: string) {
    return this.topicSubService.findTopicSubByTopicId(+topicId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateTopicSubDto: UpdateTopicSubDto, @CurrentUser() currentUser: User) {
    return this.topicSubService.update(+id, updateTopicSubDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.topicSubService.remove(+id, currentUser);
  }
}
