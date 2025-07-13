import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProductsReviewSummaryService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getSummary(productId: string) {
    const { data, error } = await this.supabaseService.client
      .from('products_review_summary')
      .select('average_rating, total_reviews')
      .eq('product_id', productId)
      .single();

    if (error) {
      return { average_rating: 0, total_reviews: 0 };
    }
    return data;
  }

  async updateSummary(productId: string) {
    const { data: reviews, error } = await this.supabaseService.client
      .from('reviews')
      .select('rating')
      .eq('product_id', productId);

    if (error) {
      throw new Error('Failed to fetch reviews for summary update');
    }

    const totalReviews = reviews.length;
    const averageRating = totalReviews
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;
    const normalizeAverageRating = Math.min(Math.max(averageRating, 0), 5);

    const { error: upsertError } = await this.supabaseService.client
      .from('products_review_summary')
      .upsert({
        product_id: productId,
        average_rating: normalizeAverageRating,
        total_reviews: totalReviews,
      });

    if (upsertError) {
      throw new Error('Failed to update product review summary');
    }
  }
}
