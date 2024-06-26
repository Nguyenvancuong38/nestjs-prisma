import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor( private readonly prisma: PrismaService){}

  async create(createProductDto: CreateProductDto) {
    try {
      const { name, updateAt, userIds } = createProductDto
      const productExit = await this.prisma.product.findUnique({
        where: {name}
      })
      if (productExit) return {
        status: 401,
        message: "Name of product are ready"
      }
      const product = await this.prisma.product.create({
        data: {
          name: name,
          updateAt: updateAt,
          users: {
            create: userIds.map(item => (
              {
                user: {
                  connect: {id: item}
                }
              }
            ))
          }
        }
      })
      return {
        status: 201,
        message: 'Create product successfully',
        data: product
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany();
      return {
        status: 200,
        message: 'Get all products successfully',
        data: products
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {id},
        include: {
          users: {
            include: {
              user: true
            }
          }
        }
      })
      
      return {
        status: 200,
        message: 'Get all products successfully',
        data: product
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const { name, updateAt, userIds } = updateProductDto;
      const productExit = await this.prisma.product.findUnique({
        where: {id}
      })

      if(!productExit) return {
        status: 401,
        message: 'Product not found'
      }

      const product = await this.prisma.product.update({
        where: {id},
        data: {
          name: name,
          updateAt: updateAt,
          users: {
            create: userIds.map(item => (
              {
                user: {
                  connect: {id: item}
                }
              }
            ))
          }
        }
      })

      return {
        status: 202,
        message: "Update product successfully",
        data: product 
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: number) {
    try {
      const productExit = await this.prisma.product.findUnique({
        where: {id}
      })
  
      if (!productExit) return {
        status: 401,
        message: "Product not found"
      }

      const product = await this.prisma.product.delete({
        where: {id}
      })
  
      return {
        status: 204,
        message: "Delete product successfully",
        data: product
      };
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
