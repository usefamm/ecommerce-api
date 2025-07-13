import { IsString, IsInt, Min, Max } from 'class-validator';

export class AddToCartDto {
  @IsString()
  product_id: string;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity: number;

  selected_color: string; // optional, if product has colors

  selected_size: string; // optional, if product has sizes
}
