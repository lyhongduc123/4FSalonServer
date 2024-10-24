import { Test, TestingModule } from '@nestjs/testing';
import { Services\Controller } from './services\.controller';

describe('Services\Controller', () => {
  let controller: Services\Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Services\Controller],
    }).compile();

    controller = module.get<Services\Controller>(Services\Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
