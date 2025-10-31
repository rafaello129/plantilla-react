import type { 
    LoginCredentials, 
    RegisterData, 
    AuthResponse, 
    RenewResponse 
  } from '../entities';
  
  export interface IAuthRepository {
    login(credentials: LoginCredentials): Promise<AuthResponse>;
    register(data: RegisterData): Promise<AuthResponse>;
    renewToken(): Promise<RenewResponse>;
    logout(): Promise<void>;
  }