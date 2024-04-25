import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const { name } = createDepartmentDto
    try {
      const departmentExit = await this.prisma.department.findUnique({
        where: {name}
      })
      if (departmentExit) return {
        status: 401,
        message: "Name of department are ready"
      }
      const department = await this.prisma.department.create({
        data: createDepartmentDto
      });
      return {
        status: 201,
        message: "Create department successfully",
        data: department
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findAll() {
    try {
      const departments = await this.prisma.department.findMany();
      return {
        status: 200,
        message: "Get departments successfully",
        data: departments
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findOne(id: number) {
    try {
      const department = await this.prisma.department.findUnique({
        where: {id}
      })
      return {
        status: 200,
        message: 'Find department by id successfully',
        data: department
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const departmentExit = await this.prisma.department.findUnique({
        where: {id}
      })
      if (!departmentExit) return {
        status: 401,
        message: "Department not exit"
      }
      const department = await this.prisma.department.update({
        where: {id},
        data: updateDepartmentDto
      });
      return {
        status: 201,
        message: "Update department successfully",
        data: department
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async remove(id: number) {
    try {
      const departmentExit = await this.prisma.department.findUnique({
        where: {id}
      })
      if (!departmentExit) return {
        status: 401,
        message: "Department not exit"
      }
      const department = await this.prisma.department.delete({
        where: {id}
      })
      return {
        status: 204,
        message: 'Delete department successfully',
        data: department
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
