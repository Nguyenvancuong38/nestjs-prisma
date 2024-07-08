import { Module } from '@nestjs/common';
import { ProductSampleService } from './product-sample.service';
import { ProductSampleController } from './product-sample.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductSampleController],
  providers: [ProductSampleService, UsersService],
})
export class ProductSampleModule {}
