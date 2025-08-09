import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from '../../enviroment/environment';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  // Demo login method
  loginDemo(email: string, password: string): Observable<AuthResponse> {
    // Simulate API call delay
    if (email === 'admin@demo.com' && password === 'password123') {
      const user: User = {
        id: '1',
        name: 'Demo User',
        email: email,
        createdAt: new Date(),
        plan: 'free',
        urlsCreated: 5,
        totalClicks: 127
      };
      
      const response: AuthResponse = {
        user,
        token: 'demo-token-123',
        refreshToken: 'demo-refresh-token-123'
      };
      
      this.setCurrentUser(response.user);
      this.setToken(response.token);
      
      return of(response);
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  // Demo register method
  registerDemo(name: string, email: string, password: string): Observable<AuthResponse> {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      createdAt: new Date(),
      plan: 'free',
      urlsCreated: 0,
      totalClicks: 0
    };
    
    const response: AuthResponse = {
      user,
      token: 'demo-token-' + Math.random().toString(36).substr(2, 9),
      refreshToken: 'demo-refresh-token-' + Math.random().toString(36).substr(2, 9)
    };
    
    this.setCurrentUser(response.user);
    this.setToken(response.token);
    
    return of(response);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user from storage:', error);
        localStorage.removeItem('user');
      }
    }
  }
}