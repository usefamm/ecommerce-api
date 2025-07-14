import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SupabaseService } from './supabase/supabase.service';
import { CategoriesModule } from './categories/categories.module';
import { CommentModule } from './comment/comment.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ProductsReviewSummaryModule } from './products-review-summary/products-review-summary.module';
@Module({
  imports: [
    AuthModule,
    ProductsModule,
    CategoriesModule,
    CommentModule,
    CartModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsReviewSummaryModule,
  ],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
