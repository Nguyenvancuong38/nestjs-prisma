import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permission } from 'src/helpers/checkPermission.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { code } = createUserDto;
    const userExit = await this.prisma.user.findUnique({
      where: {code}
    })
    if (userExit) throw new BadRequestException("User are Ready");
    createUserDto.password = await bcrypt.hash(createUserDto.password, process.env.SALTORROUNDS);   

    const user = await this.prisma.user.create({
      data: createUserDto
    });
    return {
      status: 201,
      message: "Create User Successfully.",
      data: user
    };
  }

  async findAll() {
     const users = await this.prisma.user.findMany();
     return {
      status: 200,
      message: "Find all user Successfully.",
      data: users
     }
  }

  async findByCode(code: string) {
    const user = await this.prisma.user.findUnique({
      where: {code}
    });
    if (!user) throw new BadRequestException('User not exits');
    return {
      status: 200,
      message: "Find user by code Successfully.",
      data: user
    };
  }

  async update(code: string, updateUserDto: UpdateUserDto, currentUser) {
    this.findByCode(code);
    Permission.check(code, currentUser);
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, process.env.SALTORROUNDS); 
    
    const user = await this.prisma.user.update({
      where: {code},
      data: updateUserDto
    })
    return {
      status: 201,
      message: "Update user successfully",
      data: user
    };
  }

  async remove(code: string) {
    this.findByCode(code);
    const user = await this.prisma.user.delete({
      where: {code}
    }) 
    return {
      status: 204,
      message: "Delete user successfully",
      data: user
    }
  }
}
