import { Module } from '@nestjs/common';
import { TopicSubService } from './topic-sub.service';
import { TopicSubController } from './topic-sub.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [TopicSubController],
  providers: [TopicSubService, UsersService],
})
export class TopicSubModule {}
