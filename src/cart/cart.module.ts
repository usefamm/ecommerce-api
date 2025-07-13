import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseModule } from '../supabase/supabse.module';

@Module({
  imports: [SupabaseModule],
  providers: [CartService, SupabaseService],
  controllers: [CartController],
})
export class CartModule {}
