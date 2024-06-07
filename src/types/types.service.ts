import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTypeDto: CreateTypeDto) {
    const {name, topics} = createTypeDto;

    const typeExit = await this.prisma.type.findUnique({
      where: { name }
    })
    if(typeExit) return {
      status: 401,
      massage: 'Type are ready'
    }
    const type = await this.prisma.type.create({
      data: {
        name,
        topics: {
          create: topics.map(item => (
            {
              topic: {
                connect: {id: item}
              }
            }
          ))
        }
      }
    })
    return {
      status: 201,
      message: 'Create a new type successfully',
      data: type
    };
  }

  async findAll() {
    const types = await this.prisma.type.findMany();
    return {
      status: 200,
      message: 'Find all type successfully',
      data: types
    };
  }

  async findOne(id: number) {
    const type = await this.prisma.type.findUnique({
      where: {id}
    });
    return {
      status: 200,
      message: 'Find a type successfully',
      data: type
    };
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    const {name, topics} = updateTypeDto;
    const typeExit = await this.prisma.type.findUnique({
      where: {id}
    })
    if(!typeExit) return {
      status: 401,
      message: 'Type not Exist'
    }
    const type = await this.prisma.type.update({
      where: {id},
      data: {
        name,
        topics: {
          create: topics.map(item => (
            {
              topic: {
                connect: {id: item}
              }
            }
          ))
        }
      }
    })
    return {
      status: 202,
      message: 'Update a new type successfully',
      data: type
    };
  }

  async remove(id: number) {
    const typeExit = await this.prisma.type.findUnique({
      where: {id}
    })
    if(!typeExit) return {
      status: 401,
      message: 'Type not Exist'
    }

    const type = await this.prisma.type.delete({
      where: {id}
    })

    return {
      status: 204,
      message: 'Delete a type successfully',
      data: type
    };
  }
}
