import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('/:code')
  @UseGuards(AuthGuard)
  update(@Param('code') code: string, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: User) {
    return this.usersService.update(code, updateUserDto, currentUser);
  }

  @Delete('/:code')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  remove(@Param('code') code: string) {
    return this.usersService.remove(code);
  }

  @Get('/current-user/')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Get('/:code')
  @UseGuards(AuthGuard)
  findOne(@Param('code') code: string) {
    return this.usersService.findByCode(code);
  }
}
