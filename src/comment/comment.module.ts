import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [CommentService, SupabaseService],
  controllers: [CommentController],
})
export class CommentModule {}
