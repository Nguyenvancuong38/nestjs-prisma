import { Module } from '@nestjs/common';
import { RequestProductSampleService } from './request-product-sample.service';
import { RequestProductSampleController } from './request-product-sample.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [RequestProductSampleController],
  providers: [RequestProductSampleService, UsersService],
})
export class RequestProductSampleModule {}
