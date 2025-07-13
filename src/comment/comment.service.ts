import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ProductsReviewSummaryService } from '../products-review-summary/products-review-summary.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly productsReviewSummaryService: ProductsReviewSummaryService,
  ) {}
  async createComment(user_id, dto: CreateCommentDto) {
    const { data: comment, error } = await this.supabaseService.client
      .from('comments')
      .insert({
        product_id: dto.product_id,
        user_id,
        rating: dto.rating,
        comment: dto.comment,
      })
      .select()
      .single();

    if (error) throw error;

    // Update review summary after new comment
    await this.productsReviewSummaryService.updateSummary(dto.product_id);

    return comment;
  }

  async getCommentsForProduct(product_id: string) {
    const { data: comments, error: commentsErr } =
      await this.supabaseService.client
        .from('reviews')
        .select('id, user_id, comment, rating, created_at, users(id, email)')
        .eq('product_id', product_id)
        .order('created_at', { ascending: false });

    if (commentsErr) throw commentsErr;

    return {
      comments,
    };
  }
}
