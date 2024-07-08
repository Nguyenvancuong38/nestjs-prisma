import { Test, TestingModule } from '@nestjs/testing';
import { ProductSampleController } from './product-sample.controller';
import { ProductSampleService } from './product-sample.service';

describe('ProductSampleController', () => {
  let controller: ProductSampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSampleController],
      providers: [ProductSampleService],
    }).compile();

    controller = module.get<ProductSampleController>(ProductSampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
