import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  signup(user: any) {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
}
