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

    // Update review summary after new comment
    await this.productsReviewSummaryService.updateSummary(dto.product_id);

    return comment;
  }

  async getCommentsForProduct(productId: string) {
    const { data: reviews, error } = await this.supabaseService.client
      .from('reviews')
      .select('id,user_id,comment,rating,created_at')
      .eq('product_id', productId);

    if (error) throw error;

    if (!reviews || reviews.length === 0) {
      return [];
    }

    // Extract all unique user_ids
    const userIds = [...new Set(reviews.map((r) => r.user_id))];

    // Fetch users info from auth.users for those user_ids
    const { data: users, error: userError } = await this.supabaseService.client
      .from('auth.users')
      .select('id,email')
      .in('id', userIds);

    if (userError) throw userError;

    // Map user id to user data for quick lookup
    const usersMap = new Map(users.map((u) => [u.id, u]));

    // Combine reviews with user info
    const reviewsWithUsers = reviews.map((review) => ({
      ...review,
      user: usersMap.get(review.user_id) || null,
    }));

    return reviewsWithUsers;
  }
}
