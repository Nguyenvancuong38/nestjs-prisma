import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [DepartmentController],
  providers: [DepartmentService, UsersService],
})
export class DepartmentModule {}
