import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase.client
      .from('categories')
      .select('*');
    if (error) throw error;
    return data;
  }

  async create(name: string) {
    const { data, error } = await this.supabase.client
      .from('categories')
      .insert({ name })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
