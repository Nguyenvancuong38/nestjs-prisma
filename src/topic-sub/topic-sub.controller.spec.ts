import { Test, TestingModule } from '@nestjs/testing';
import { TopicSubController } from './topic-sub.controller';
import { TopicSubService } from './topic-sub.service';

describe('TopicSubController', () => {
  let controller: TopicSubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicSubController],
      providers: [TopicSubService],
    }).compile();

    controller = module.get<TopicSubController>(TopicSubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
