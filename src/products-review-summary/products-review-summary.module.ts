import { Module } from '@nestjs/common';
import { ProductsReviewSummaryService } from './products-review-summary.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [ProductsReviewSummaryService, SupabaseService],
  exports: [ProductsReviewSummaryService],
})
export class ProductsReviewSummaryModule {}
