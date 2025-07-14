export interface CartItem {
  id: string;
  user_id?: string;
  product_id: string;
  quantity: number;
  selected_color?: string | null;
  selected_size?: string | null;
  created_at?: string;
  products?: {
    title: string;
    price: number;
    images: string[];
  }[];
}
export interface RemoveFromCartData {
  message: string;
}
