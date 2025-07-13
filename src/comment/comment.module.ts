import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentsController } from './comment.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [CommentService, SupabaseService],
  controllers: [CommentsController],
})
export class CommentModule {}
