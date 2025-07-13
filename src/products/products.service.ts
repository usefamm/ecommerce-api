import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.service';

@Injectable()
export class ProductsService {
  async findAll() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async create(product: any) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
}
