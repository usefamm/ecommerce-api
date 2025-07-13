import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { SupabaseGuard } from '../common/guards/supabase.guard';

@Controller('categories')
@UseGuards(SupabaseGuard)
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
