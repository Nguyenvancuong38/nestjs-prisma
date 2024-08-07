import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { ProductModule } from './product/product.module';
import { RequestModule } from './request/request.module';
import { RequestDetailsModule } from './request-details/request-details.module';
import { TopicsModule } from './topics/topics.module';
import { TopicSubModule } from './topic-sub/topic-sub.module';
import { TypesModule } from './types/types.module';
import { ProductSampleModule } from './product-sample/product-sample.module';
import { RequestProductSampleModule } from './request-product-sample/request-product-sample.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    AuthModule, 
    DepartmentModule, 
    ProductModule, 
    RequestModule, 
    RequestDetailsModule, 
    TopicsModule, 
    TopicSubModule, TypesModule, ProductSampleModule, RequestProductSampleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
