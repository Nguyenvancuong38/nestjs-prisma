import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.usersService.findByCode(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(code, updateUserDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.usersService.remove(code);
  }
}
