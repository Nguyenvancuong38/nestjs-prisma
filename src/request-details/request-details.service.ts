import { Injectable } from '@nestjs/common';
import { CreateRequestDetailDto } from './dto/create-request-detail.dto';
import { UpdateRequestDetailDto } from './dto/update-request-detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permission } from 'src/helpers/checkPermission.helper';

@Injectable()
export class RequestDetailsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRequestDetailDto: CreateRequestDetailDto) {
    const requestDetail = await this.prisma.requestDetail.create({
      data: createRequestDetailDto
    })
    return {
      status: 200,
      message: 'Create request detail successfully',
      data: requestDetail
    };
  }

  findAll() {
    return `This action returns all requestDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestDetail`;
  }

  update(id: number, updateRequestDetailDto: UpdateRequestDetailDto) {
    return `This action updates a #${id} requestDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestDetail`;
  }
}
