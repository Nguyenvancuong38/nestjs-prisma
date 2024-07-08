import { Test, TestingModule } from '@nestjs/testing';
import { ProductSampleService } from './product-sample.service';

describe('ProductSampleService', () => {
  let service: ProductSampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSampleService],
    }).compile();

    service = module.get<ProductSampleService>(ProductSampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
