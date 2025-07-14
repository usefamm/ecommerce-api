import {
  Controller,
  Request,
  Post,
  Body,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Request() req, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, dto);
  }

  @Get()
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Delete('remove')
  async removeFromCart(
    @Request() req,
    @Query('product_id') product_id: string,
  ) {
    return this.cartService.removeFromCart(req.user.id, product_id);
  }
}
