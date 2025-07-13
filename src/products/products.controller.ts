import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SupabaseGuard } from '../common/guards/supabase.guard';

@Controller('products')
@UseGuards(SupabaseGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}
