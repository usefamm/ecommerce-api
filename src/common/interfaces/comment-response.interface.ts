export interface AddComentResponse {
  id: string;
  user_id: string;
  product_id: string;
  comment: string;
  rating: number;
  created_at: string;
}

export interface GetCommentsResponse {
  id: string;
  comment: string;
  rating: number;
  created_at: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
}
