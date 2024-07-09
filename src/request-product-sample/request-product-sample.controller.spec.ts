import { Test, TestingModule } from '@nestjs/testing';
import { RequestProductSampleController } from './request-product-sample.controller';
import { RequestProductSampleService } from './request-product-sample.service';

describe('RequestProductSampleController', () => {
  let controller: RequestProductSampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestProductSampleController],
      providers: [RequestProductSampleService],
    }).compile();

    controller = module.get<RequestProductSampleController>(RequestProductSampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
