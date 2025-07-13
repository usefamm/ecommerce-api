import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SupabaseService } from './supabase/supabase.service';
import { CategoriesModule } from './categories/categories.module';
import { CommentModule } from './comment/comment.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [
    AuthModule,
    ProductsModule,
    CategoriesModule,
    CommentModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
  exports: [SupabaseService],
})
export class AppModule {}
