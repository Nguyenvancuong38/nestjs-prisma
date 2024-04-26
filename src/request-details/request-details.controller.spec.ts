import { Test, TestingModule } from '@nestjs/testing';
import { RequestDetailsController } from './request-details.controller';
import { RequestDetailsService } from './request-details.service';

describe('RequestDetailsController', () => {
  let controller: RequestDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestDetailsController],
      providers: [RequestDetailsService],
    }).compile();

    controller = module.get<RequestDetailsController>(RequestDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
