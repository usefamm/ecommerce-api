import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly supabaseService: SupabaseService) {}

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
    const { data, error } = await this.supabaseService.client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
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
