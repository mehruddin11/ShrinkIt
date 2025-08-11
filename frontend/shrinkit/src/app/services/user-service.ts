import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/environment';
import { RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.baseUrl}/api/users`;

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data);
  }

  updateProfile(data: Partial<RegisterRequest>): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, data);
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/account`);
  }
}
