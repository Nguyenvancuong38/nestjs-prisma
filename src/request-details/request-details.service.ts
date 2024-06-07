import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRequestDetailDto } from './dto/create-request-detail.dto';
import { UpdateRequestDetailDto } from './dto/update-request-detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestDetailsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRequestDetailDto: CreateRequestDetailDto) {
    try {
      const requestDetail = await this.prisma.requestDetail.create({
        data: createRequestDetailDto
      })
      return {
        status: 201,
        message: 'Create request detail successfully',
        data: requestDetail
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      const requestDetails = await this.prisma.requestDetail.findMany()
      return {
        status: 200,
        message: 'Get all request detail successfully',
        data: requestDetails
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: number) {
    try {
      const requestDetail = await this.prisma.requestDetail.findUnique({
        where: {id}
      })
      return {
        status: 200,
        message: 'Get request detail successfully',
        data: requestDetail
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: number, updateRequestDetailDto: UpdateRequestDetailDto) {
    try {
      const requestDetailExit = await this.prisma.requestDetail.findUnique({
        where: {id}
      })
      if (!requestDetailExit) throw new BadRequestException('Request detail not exit')
      const requestDetail = await this.prisma.requestDetail.update({
        where: {id},
        data: updateRequestDetailDto
      })
      return {
        status: 202,
        message: 'Update request detail successfully',
        data: requestDetail
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: number) {
    try {
      const requestDetailExit = await this.prisma.requestDetail.findUnique({
        where: {id}
      })
      if (!requestDetailExit) throw new BadRequestException('Request detail not exit')
      const requestDetail = await this.prisma.requestDetail.delete({
        where: {id}
      })
      return {
        status: 204,
        message: 'Delete request detail successfully',
        data: requestDetail
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
