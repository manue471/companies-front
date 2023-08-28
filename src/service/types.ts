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

export type Company = {
  name: string;
  cnpj: string;
  email: string;
  representantive_user: string;
  city_id: string;
  state_id: string;
  latitude: number;
  longitude: number;
  category_id: string;
  whatsapp_phone: string;
  notes?: string
 }