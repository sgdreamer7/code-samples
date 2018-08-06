import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getToken(): string {
    return localStorage.getItem('auth_token');
  }

  getUser(): Observable<any> {
    return this.http.get(`${environment.api_url}/auth/me`);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${environment.api_url}/auth/login`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${environment.api_url}/auth/login`, userData);
  }

}
