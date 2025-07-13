import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { SupabaseGuard } from '../common/guards/supabase.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create comment, protected route
  @UseGuards(SupabaseGuard)
  @Post()
  async addComment(@Request() req, @Body() dto: CreateCommentDto) {
    const user = req.user;
    return this.commentsService.createComment(user.id, dto);
  }

  // Get comments + avg rating for product
  @Get('product/:product_id')
  async getProductComments(@Param('product_id') product_id: string) {
    return this.commentsService.getCommentsForProduct(product_id);
  }
}
