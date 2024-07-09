import { Test, TestingModule } from '@nestjs/testing';
import { RequestProductSampleService } from './request-product-sample.service';

describe('RequestProductSampleService', () => {
  let service: RequestProductSampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestProductSampleService],
    }).compile();

    service = module.get<RequestProductSampleService>(RequestProductSampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
