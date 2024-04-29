import { Test, TestingModule } from '@nestjs/testing';
import { TopicSubService } from './topic-sub.service';

describe('TopicSubService', () => {
  let service: TopicSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicSubService],
    }).compile();

    service = module.get<TopicSubService>(TopicSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
