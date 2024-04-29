import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permission } from 'src/helpers/checkPermission.helper';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTopicDto: CreateTopicDto) {
    const topic = await this.prisma.topic.create({
      data: createTopicDto
    })
    return {
      status: 201,
      message: 'Create Topic successfully',
      data: topic
    };
  }

  async findAll() {
    const topics = await this.prisma.topic.findMany({
      include: {
        author: true
      }
    })
    return {
      status: 200,
      message: 'Find all topics successfully',
      data: topics
    };
  }

  async findOne(id: number) {
    const topic = await this.prisma.topic.findUnique({
      where: {id},
      include: {
        author: true
      }
    })
    return {
      status: 200,
      message: 'Get a topic successfully',
      data: topic
    };
  }

  async findByProduct(productId: number) {
    const topics = await this.prisma.topic.findMany({
      where: {productId: productId}
    })
    return {
      status: 200,
      message: 'Get topic by product successfully',
      data: topics
    }
  }

  async update(id: number, updateTopicDto: UpdateTopicDto, currentUser) {
    const topicExit = await this.prisma.topic.findUnique({
      where: {id}
    })
    if(!topicExit) return  {
      status: 401,
      message: 'Topic not found'
    }
    Permission.check(topicExit.authorId, currentUser)
    const topic = await this.prisma.topic.update({
      where: {id},
      data: updateTopicDto
    })
    return {
      status: 200,
      message: 'Update topic successfully',
      data: topic
    };
  }

  async remove(id: number, currentUser) {
    const topicExit = await this.prisma.topic.findUnique({
      where: {id}
    })
    if(!topicExit) return {
      status: 401,
      message: 'Topic not found'
    }
    Permission.check(topicExit.authorId, currentUser)
    const topic = await this.prisma.topic.delete({
      where: {id}
    })
    return {
      status: 204,
      message: 'Delete topic successfully',
      data: topic
    };
  }
}
