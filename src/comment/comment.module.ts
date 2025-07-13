import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseModule } from '../supabase/supabse.module';

@Module({
  imports: [SupabaseModule],
  providers: [CommentService, SupabaseService],
  controllers: [CommentController],
})
export class CommentModule {}
