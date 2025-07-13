import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SupabaseService } from './supabase/supabase.service';
import { CategoriesModule } from './categories/categories.module';
import { CommentModule } from './comment/comment.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
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
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
  exports: [SupabaseService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}
