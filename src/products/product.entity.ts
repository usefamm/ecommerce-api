export class Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[]; // array of image URLs
  colors: string[]; // e.g., ["red", "blue", "green"]
  sizes: string[]; // e.g., ["SM", "MD", "LG", "XL"]
}
