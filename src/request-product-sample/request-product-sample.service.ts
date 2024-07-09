import { Injectable } from '@nestjs/common';
import { CreateRequestProductSampleDto } from './dto/create-request-product-sample.dto';
import { UpdateRequestProductSampleDto } from './dto/update-request-product-sample.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permission } from 'src/helpers/checkPermission.helper';

@Injectable()
export class RequestProductSampleService {
  constructor(private readonly prisma: PrismaService) { }

  //Function create new
  async create(createRequestProductSampleDto: CreateRequestProductSampleDto) {
    const { description, authorId, createAt, productSampleIds } = createRequestProductSampleDto;
    const data = await this.prisma.requestProductSample.create({
      data: {
        description: description,
        authorId: authorId,
        createAt: createAt,
        productSample: {
          connect: productSampleIds.map(id => ({ id }))
        }
      }
    })
    return {
      status: 201,
      message: 'Create request product sample successful',
      data: data
    };
  }

  //Function get all
  async findAll() {
    const data = await this.prisma.requestProductSample.findMany();

    return {
      status: 200,
      message: 'Find all request product sample successful',
      data: data
    };
  }

  async findOne(id: number) {
    const data = await this.prisma.requestProductSample.findUnique({
      where: { id }
    });

    return {
      status: 200,
      message: 'Find request product sample by id successful',
      data: data
    };
  }

  //Function update 
  async update(id: number, updateRequestProductSampleDto: UpdateRequestProductSampleDto, currentUser) {
    const { description, authorId, createAt, productSampleIds } = updateRequestProductSampleDto
    Permission.check(authorId, currentUser);
    const dataOld = await this.prisma.requestProductSample.findUnique({
      where: { id },
      include: { productSample: true }
    })

    if (!dataOld) {
      return {
        status: 400,
        message: 'Find request product sample by id not found',
      }
    }

    const currentProductSampleIds = dataOld.productSample.map(ps => ps.id);

    const data = await this.prisma.requestProductSample.update({
      where: { id },
      data: {
        description: description,
        authorId: authorId,
        createAt: createAt,
        productSample: {
          disconnect: currentProductSampleIds.map(id => ({ id })),
          connect: productSampleIds.map(id => ({ id }))
        }
      }
    })

    return {
      status: 202,
      message: 'Update request product by id successful',
      data: data
    };
  }

  //Function delete
  async remove(id: number, currentUser) {
    const dataExit = await this.prisma.requestProductSample.findUnique({
      where: { id }
    })
    if (!dataExit) {
      return {
        status: 400,
        message: 'Request product sample not found with id'
      }
    }

    Permission.check(dataExit.authorId, currentUser);

    const data = await this.prisma.requestProductSample.delete({
      where: { id }
    });

    return {
      status: 204,
      message: 'Delete request product sample by id successful',
      data: data
    };
  }
}
