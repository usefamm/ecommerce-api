import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ProductsReviewSummaryService } from '../products-review-summary/products-review-summary.service';
import {
  AddComentResponse,
  GetCommentsResponse,
} from '../common/interfaces/comment-response.interface';

@Injectable()
export class CommentService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly productsReviewSummaryService: ProductsReviewSummaryService,
  ) {}
  async createComment(
    user_id,
    dto: CreateCommentDto,
  ): Promise<AddComentResponse> {
    const { data: comment, error } = await this.supabaseService.client
      .from('reviews')
      .insert({
        product_id: dto.product_id,
        user_id,
        rating: dto.rating,
        comment: dto.comment,
      })
      .select()
      .single();

    if (error) throw error;

    await this.productsReviewSummaryService.updateSummary(dto.product_id);

    return comment;
  }

  async getCommentsForProduct(
    productId: string,
  ): Promise<GetCommentsResponse[]> {
    const { data: reviews, error } = await this.supabaseService.client
      .from('reviews')
      .select(
        `
        id,
        comment,
        rating,
        created_at,
        user:profiles (
          id,
          full_name,
          avatar_url
        )
      `,
      )
      .eq('product_id', productId);

    if (error) throw error;

    return (reviews || []).map((review) => ({
      ...review,
      user: Array.isArray(review.user) ? review.user[0] : review.user,
    }));
  }
}
