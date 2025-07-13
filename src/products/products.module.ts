import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SupabaseModule } from '../supabase/supabse.module';
import { ProductsReviewSummaryModule } from '../products-review-summary/products-review-summary.module';

@Module({
  imports: [SupabaseModule, ProductsReviewSummaryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
