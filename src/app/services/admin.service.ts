import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5235/api/admin';
  private casosUrl = 'http://localhost:5235/api/casos';

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

  desactivarMediador(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/desactivar-mediador/${userId}`, {}, {
      headers: this.getHeaders()
    });
  }

  listarCasos(): Observable<any[]> {
    return this.http.get<any[]>(this.casosUrl, {
      headers: this.getHeaders()
    });
  }

  asignarMediadorCaso(casoId: string, mediadorId: string): Observable<any> {
    return this.http.put(
      `${this.casosUrl}/${casoId}/asignar-mediador`,
      JSON.stringify(mediadorId),
      {
        headers: this.getHeaders().set('Content-Type', 'application/json')
      }
    );
  }
}