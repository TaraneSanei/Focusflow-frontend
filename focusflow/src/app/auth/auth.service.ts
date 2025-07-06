import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/api/token", { email, password }).pipe(
      tap(response => {
        this.setToken(response.access);
        this.setRefreshToken(response.refresh);
      }),
      catchError(error => {
        if (error.status === 401) {
          return of({ error: 'Invalid credentials' });
        } else {
          return of({ error: 'An unknown error occurred' });
        }
      })
    );
  }

  
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setRefreshToken(token: string): void {
    this.cookieService.set(this.refreshTokenKey, token, 1);
    
  }

  getRefreshToken(): string | null {
    return this.cookieService.get(this.refreshTokenKey)
  }

  logout(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.router.navigate(['/login']);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  removeRefreshToken(): void {
    this.cookieService.delete(this.refreshTokenKey);
  }

  
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const expiryTime = decoded.exp * 1000;
    return Date.now() >= expiryTime;
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>('/api/refresh-token/', { refresh: refreshToken }).pipe(
      tap(response => {
        this.setToken(response.access); // Update access token
      }),
      catchError(error => {
        this.logout();
        return of({'error': error})
      })
    );
  }
}
