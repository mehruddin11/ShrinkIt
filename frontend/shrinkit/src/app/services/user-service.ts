// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseurl = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.baseurl}/register`, data);
  }
}
