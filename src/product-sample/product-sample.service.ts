import { Injectable } from '@nestjs/common';
import { CreateProductSampleDto } from './dto/create-product-sample.dto';
import { UpdateProductSampleDto } from './dto/update-product-sample.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductSampleService {
  constructor(private readonly prisma: PrismaService){}

  async create(createProductSampleDto: CreateProductSampleDto) {
    const productSample = await this.prisma.productSample.create({
      data: createProductSampleDto
    })
    return {
      status: 201,
      message: 'Create product sample successful',
      data: productSample
    };
  }

  async findAll() {
    const productSample = await this.prisma.productSample.findMany();
    return {
      status: 200,
      message: 'Get all product sample successful',
      data: productSample
    };
  }

  async findOne(id: number) {
    const productSample = await this.prisma.productSample.findUnique({
      where: { id }
    })
    return {
      status: 200,
      message: 'Get product sample by id successful',
      data: productSample
    };
  }

  async update(id: number, updateProductSampleDto: UpdateProductSampleDto) {
    const productSample = await this.prisma.productSample.update({
      where: { id },
      data: updateProductSampleDto
    })
    return {
      status: 202,
      message: 'Update product sample successful',
      data: productSample
    };
  }

  async remove(id: number) {
    const productSample = await this.prisma.productSample.delete({
      where: { id },
    })
    return {
      status: 204,
      message: 'Delete product sample successful',
      data: productSample
    }
  }
}
