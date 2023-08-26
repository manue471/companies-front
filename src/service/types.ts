export type Login = {
  email: string;
  password: string;
}

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_logged: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
  };
}