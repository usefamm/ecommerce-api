import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Create a comment
  async createComment(user_id: string, dto: CreateCommentDto) {
    const { product_id, comment, rating } = dto;

    const { data, error } = await this.supabaseService.client
      .from('comments')
      .insert({
        product_id,
        user_id,
        comment,
        rating,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCommentsForProduct(product_id: string) {
    const { data: comments, error: commentsErr } =
      await this.supabaseService.client
        .from('comments')
        .select('id, user_id, comment, rating, created_at, users(id, email)') // join user email for example
        .eq('product_id', product_id)
        .order('created_at', { ascending: false });

    if (commentsErr) throw commentsErr;

    const ratings = comments.map((c) => c.rating);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : null;

    return {
      average_rating: avgRating,
      comments,
    };
  }
}
