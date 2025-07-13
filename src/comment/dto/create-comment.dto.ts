import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
