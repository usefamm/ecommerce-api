import { IsString, IsInt, Min, Max } from 'class-validator';

export class AddToCartDto {
  @IsString()
  product_id: string;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity: number;

  @IsString()
  selected_color: string;

  @IsString()
  selected_size: string;
}
