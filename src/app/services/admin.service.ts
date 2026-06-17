import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5235/api/admin';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  obtenerDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, {
      headers: this.getHeaders()
    });
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, {
      headers: this.getHeaders()
    });
  }

  listarMediadores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mediadores`, {
      headers: this.getHeaders()
    });
  }

  alternarEstado(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/alternar-estado/${userId}`, {}, {
      headers: this.getHeaders()
    });
  }

  asignarZona(userId: string, zoneId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignar-zona`, {
      userId,
      zoneId
    }, {
      headers: this.getHeaders()
    });
  }
}