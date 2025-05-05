export enum UserRole {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  LEARNER = 'learner',
  GUEST = 'guest'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'id'>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
} 