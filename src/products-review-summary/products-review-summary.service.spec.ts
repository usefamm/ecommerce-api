import { Test, TestingModule } from '@nestjs/testing';
import { ProductsReviewSummaryService } from './products-review-summary.service';

describe('ProductsReviewSummaryService', () => {
  let service: ProductsReviewSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsReviewSummaryService],
    }).compile();

    service = module.get<ProductsReviewSummaryService>(
      ProductsReviewSummaryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
