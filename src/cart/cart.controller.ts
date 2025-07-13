import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { SupabaseGuard } from '../common/guards/supabase.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
@UseGuards(SupabaseGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Request() req, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, dto);
  }
}
