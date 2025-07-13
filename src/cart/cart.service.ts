import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
@Injectable()
export class CartService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Add or update product quantity in cart for user
  async addToCart(user_id: string, dto: AddToCartDto) {
    const { product_id, quantity } = dto;

    // Check if product already in cart
    const { data: existing, error: selectErr } =
      await this.supabaseService.client
        .from('cart')
        .select('*')
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .single();

    if (selectErr && selectErr.code !== 'PGRST116') {
      // PGRST116 = no rows found, ignore
      throw selectErr;
    }

    if (existing) {
      // Update quantity
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
        .insert({ user_id, product_id, quantity })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
}
