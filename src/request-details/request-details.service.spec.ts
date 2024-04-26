import { Test, TestingModule } from '@nestjs/testing';
import { RequestDetailsService } from './request-details.service';

describe('RequestDetailsService', () => {
  let service: RequestDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestDetailsService],
    }).compile();

    service = module.get<RequestDetailsService>(RequestDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
