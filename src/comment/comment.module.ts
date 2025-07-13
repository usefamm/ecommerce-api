import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseModule } from '../supabase/supabse.module';
import { ProductsReviewSummaryModule } from '../products-review-summary/products-review-summary.module';

@Module({
  imports: [SupabaseModule, ProductsReviewSummaryModule],
  providers: [CommentService, SupabaseService],
  controllers: [CommentController],
})
export class CommentModule {}
