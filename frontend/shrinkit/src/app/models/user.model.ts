export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  plan: 'free' | 'premium' | 'enterprise';
  urlsCreated: number;
  totalClicks: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}