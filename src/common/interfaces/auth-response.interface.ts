export interface CleanUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at?: string | null;
  created_at: string;
  updated_at: string;
  email_verified: boolean;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  data: {
    access_token: string;
    refresh_token: string;
    user: CleanUser;
  };
}


export interface SignUpResponse {
  success: boolean;
  statusCode: number;
  data: {
    message: string;
    user: CleanUser;
  };
}
