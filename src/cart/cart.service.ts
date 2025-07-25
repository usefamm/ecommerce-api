import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import {
  CartItem,
  RemoveFromCartData,
} from '../common/interfaces/cart-response.interface';
@Injectable()
export class CartService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async addToCart(user_id: string, dto: AddToCartDto): Promise<CartItem> {
    const { product_id, quantity, selected_color, selected_size } = dto;

    const { data: existing, error: selectErr } =
      await this.supabaseService.client
        .from('cart')
        .select('*')
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .single();

    if (selectErr && selectErr.code !== 'PGRST116') {
      console.error('Error selecting cart item:', selectErr);
      throw selectErr;
    }

    if (existing) {
      const newQuantity = Math.min(existing.quantity + quantity, 20);
      const { data, error } = await this.supabaseService.client
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await this.supabaseService.client
        .from('cart')
        .insert({
          user_id,
          product_id,
          quantity,
          selected_color,
          selected_size,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    }
  }

  async getCart(user_id: string): Promise<CartItem[]> {
    const { data, error } = await this.supabaseService.client
      .from('cart')
      .select('id, product_id, quantity, products(title, price, images)')
      .eq('user_id', user_id);

    if (error) throw error;

    return data;
  }

  async removeFromCart(
    user_id: string,
    product_id: string,
  ): Promise<RemoveFromCartData> {
    const { error } = await this.supabaseService.client
      .from('cart')
      .delete()
      .eq('user_id', user_id)
      .eq('product_id', product_id);

    if (error) throw error;
    return { message: 'Removed from cart' };
  }
}
