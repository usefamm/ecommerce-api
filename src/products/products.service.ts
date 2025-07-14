import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ProductsReviewSummaryService } from '../products-review-summary/products-review-summary.service';
import {
  Product,
  ProductDetail,
} from '../common/interfaces/products-response.interface';

@Injectable()
export class ProductsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly productsReviewSummaryService: ProductsReviewSummaryService,
  ) {}

  async findAll(): Promise<Product[]> {
    const { data, error } = await this.supabaseService.client
      .from('products')
      .select(
        'id, title, description, price, images, colors, sizes, category:categories(name)',
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map((product) => ({
      ...product,
      category: Array.isArray(product.category)
        ? product.category[0]
        : product.category,
    }));
  }

  async findById(id: string): Promise<ProductDetail> {
    const { data: product, error } = await this.supabaseService.client
      .from('products')
      .select(
        'id , title, description, price, images, colors, sizes, category:categories(name)',
      )
      .eq('id', id)
      .single();

    if (error || !product) throw new NotFoundException('Product not found');

    const summary = await this.productsReviewSummaryService.getSummary(id);

    return {
      ...product,
      category: Array.isArray(product.category)
        ? product.category[0]
        : product.category,
      average_rating: summary.average_rating,
      total_reviews: summary.total_reviews,
    };
  }
}
