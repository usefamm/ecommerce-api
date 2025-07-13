import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentsController } from './comment.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [CommentsService, SupabaseService],
  controllers: [CommentsController],
})
export class CommentsModule {}
