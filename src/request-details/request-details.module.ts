import { Module } from '@nestjs/common';
import { RequestDetailsService } from './request-details.service';
import { RequestDetailsController } from './request-details.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [RequestDetailsController],
  providers: [RequestDetailsService, UsersService],
})
export class RequestDetailsModule {}
