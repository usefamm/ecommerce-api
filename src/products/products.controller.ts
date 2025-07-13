import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { SupabaseGuard } from '../common/guards/supabase.guard';

@Controller('products')
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

  @UseGuards(SupabaseGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
}
