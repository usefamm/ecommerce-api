import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Category } from '../common/interfaces/categories-response.interface';

@Injectable()
export class CategoriesService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll(): Promise<Category[]> {
    const { data, error } = await this.supabase.client
      .from('categories')
      .select('*');
    if (error) throw error;
    return data;
  }
}
