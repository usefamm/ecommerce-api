import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { SupabaseGuard } from '../common/guards/supabase.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Create comment, protected route
  @UseGuards(SupabaseGuard)
  @Post()
  async addComment(@Request() req, @Body() dto: CreateCommentDto) {
    const user = req.user;
    return this.commentService.createComment(user.id, dto);
  }

  // Get comments + avg rating for product
  @Get('product/:product_id')
  async getProductComments(@Param('product_id') product_id: string) {
    return this.commentService.getCommentsForProduct(product_id);
  }
}
