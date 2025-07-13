import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [CartService, SupabaseService],
  controllers: [CartController],
})
export class CartModule {}
