import { Injectable } from '@nestjs/common';
import { CreateTopicSubDto } from './dto/create-topic-sub.dto';
import { UpdateTopicSubDto } from './dto/update-topic-sub.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Permission } from 'src/helpers/checkPermission.helper';

@Injectable()
export class TopicSubService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTopicSubDto: CreateTopicSubDto) {
    const topicSub = await this.prisma.topicSub.create({
      data: createTopicSubDto
    })
    return {
      status: 201,
      message: 'Create topicSub successfully',
      data: topicSub
    };
  }

  async findAll() {
    const topicSubs = await this.prisma.topicSub.findMany({
      include: {
        author: true
      }
    })
    return {
      status: 200,
      message: 'Find topic sub all successfully',
      data: topicSubs
    };
  }

  async findOne(id: number) {
    const topicSub = await this.prisma.topicSub.findUnique({
      where: {id},
      include: {
        author: true
      }
    })
    return {
      status: 200,
      message: 'Find topic sub successfully',
      data: topicSub
    };
  }

  async findTopicSubByTopicId(topicId: number) {
    const topicSubs = await this.prisma.topicSub.findMany({
      where: {topicId: topicId},
      include: {
        author: true
      }
    })
    return {
      status: 200,
      message: 'Find topic sub by topic id successfully',
      data: topicSubs
    }
  }

  async update(id: number, updateTopicSubDto: UpdateTopicSubDto, currentUser: User) {
    const topicSubExit = await this.prisma.topicSub.findUnique({
      where: {id}
    })
    if(!topicSubExit) return {
      status: 401,
      message: 'Topic not exit'
    }
    Permission.check(topicSubExit.authorId, currentUser);
    const topicSub = await this.prisma.topicSub.update({
      where: {id},
      data: updateTopicSubDto
    })
    return {
      status: 202,
      message: 'Update topic sub successfully',
      data: topicSub
    };
  }

  async remove(id: number, currentUser: User) {
    const topicSubExit = await this.prisma.topicSub.findUnique({
      where: {id}
    })
    if(!topicSubExit) return {
      status: 401,
      message: 'Topic not exit'
    }
    Permission.check(topicSubExit.authorId, currentUser);
    const topicSub = await this.prisma.topicSub.delete({
      where: {id}
    })
    return {
      status: 202,
      message: 'Update topic sub successfully',
      data: topicSub
    };
  }
}
