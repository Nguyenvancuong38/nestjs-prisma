import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permission } from 'src/helpers/checkPermission.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { code, name, email, password, role, departmentId, updateAt, productIds } = createUserDto;
    const userExit = await this.prisma.user.findUnique({
      where: {code}
    })
    if (userExit) throw new BadRequestException("User are Ready");
    const userGetByEmail = await this.prisma.user.findUnique({
      where: {email}
    })
    if (userGetByEmail) throw new BadRequestException("Email are Ready");
    const passwordHash = await bcrypt.hash(password, 10); 
    const user = await this.prisma.user.create({
      data: {
        code: code,
        name: name,
        email: email,
        role: role,
        departmentId: departmentId,
        updateAt: updateAt,
        password: passwordHash,
        products: {
          create: productIds.map(item => (
            {
              product: {
                connect: {id: item}
              }
            }
          ))
        }
      }
    });

    return {
      status: 201,
      message: "Create User Successfully.",
      data: user
    };
  }

  async findAll() {
     const users = await this.prisma.user.findMany({
      include: {
        department: true
      }
     });
     return {
      status: 200,
      message: "Find all user Successfully.",
      data: users
     }
  }

  async findByCode(code: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        code
      },
      include: {
        department: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    if (!user) throw new BadRequestException('User not exits');
    return {
      status: 200,
      message: "Find user by code Successfully.",
      data: user
    };
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        department: true,
        products: {
          include: {
            product: true
          }
        }
      }
    });
    if (!user) throw new BadRequestException('User not exits');
    return {
      status: 200,
      message: "Find user by code Successfully.",
      data: user
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser) {
    this.findById(id);
    Permission.check(id, currentUser);
    const { code, name, email, password, role, departmentId, updateAt, productIds } = updateUserDto;
    const passwordHash = await bcrypt.hash(password, 10); 

    await this.prisma.productWithUsers.deleteMany({
      where: {userId: id}
    })
    
    const user = await this.prisma.user.update({
      where: {id},
      data: {
        code: code,
        name: name,
        email: email,
        role: role,
        departmentId: departmentId,
        updateAt: updateAt,
        password: passwordHash,
        products: {
          create: productIds.map(item => (
            {
              product: {
                connect: {id: item}
              }
            }
          ))
        }
      }
    })

    return {
      status: 201,
      message: "Update user successfully",
      data: user
    };
  }

  async remove(id: number) {
    try {
      this.findById(id);
      const user = await this.prisma.user.delete({
        where: {id},
      }) 
      return {
        status: 204,
        message: "Delete user successfully",
        data: user
      }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
