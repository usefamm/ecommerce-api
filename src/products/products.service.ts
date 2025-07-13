import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsReviewSummaryService } from '../products-review-summary/products-review-summary.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly productsReviewSummaryService: ProductsReviewSummaryService,
  ) {}

  async findAll() {
    const { data, error } = await this.supabaseService.client
      .from('products')
      .select(
        'id, title, description, price, images, colors, sizes, category_id',
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map((product) => ({
      ...product,
      image: product.images?.[0] || null,
    }));
  }

  async findById(id: string) {
    const { data: product, error } = await this.supabaseService.client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !product) throw new NotFoundException('Product not found');

    const summary = await this.productsReviewSummaryService.getSummary(id);

    return {
      ...product,
      average_rating: summary.average_rating,
      total_reviews: summary.total_reviews,
    };
  }

  async create(dto: CreateProductDto) {
    const { data, error } = await this.supabaseService.client
      .from('products')
      .insert({
        title: dto.title,
        description: dto.description,
        price: dto.price,
        images: dto.images,
        colors: dto.colors || [],
        sizes: dto.sizes || [],
        category_id: dto.category_id || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
