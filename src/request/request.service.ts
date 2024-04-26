import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permission } from 'src/helpers/checkPermission.helper';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRequestDto: CreateRequestDto) {
    const { title } = createRequestDto
    const requestExit = await this.prisma.request.findUnique({
      where: {title}
    })
    if(requestExit) return {
      status: 401,
      message: 'Title request are ready'
    }

    const request = await this.prisma.request.create({
      data: createRequestDto
    })
    return {
      status: 201,
      message: 'Create request successfully',
      data: request
    };
  }

  async findAll() {
    const requests = await this.prisma.request.findMany();
    return {
      status: 200,
      message: 'Get all requests successfully',
      data: requests
    };
  }

  async findOne(id: number) {
    const request = await this.prisma.request.findUnique({
      where: {id}
    })
    return {
      status: 200,
      message: 'Get request successfully',
      data: request
    };
  }

  async update(id: number, updateRequestDto: UpdateRequestDto, currentUser) {
    const requestExit = await this.prisma.request.findUnique({
      where: {id}
    })
    if (!requestExit) return { 
      status: 401,
      message: 'Request not exit'
    }
    const { authorId } = updateRequestDto
    Permission.check(authorId, currentUser)
    const request = await this.prisma.request.update({
      where: {id},
      data: updateRequestDto
    })
    return {
      status: 201,
      message: 'Update request successfully',
      data: request
    };
  }

  async remove(id: number) {
    try {
      const requestExit = await this.prisma.request.findUnique({
        where: {id}
      })
      if (!requestExit) return { 
        status: 401,
        message: 'Request not exit'
      }
      await this.prisma.requestDetail.deleteMany({
        where: {requestId: id}
      })
      const request = await this.prisma.request.delete({
        where: {id}
      })

      return {
        status: 204,
        message: 'Delete request successfully',
        data: request
      }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findByProductId(productId: number) {
    try {
      const requests = await this.prisma.request.findMany({
        where: {productId:productId}
      })
      return {
        status: 200,
        message: 'Get requests by product id',
        data: requests
      }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
