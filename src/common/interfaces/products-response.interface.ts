export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  colors: string[];
  sizes: string[];
  category: {
    name: string;
  };
}

export interface ProductDetail extends Product {
  average_rating: number;
  total_reviews: number;
}
