import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = 'http://localhost:5235/api/casos';

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

  crearCaso(
    titulo: string,
    descripcion: string,
    direccion: string,
    categoria: string,
    contraparteId: string,
    zoneId: string
  ): Observable<any> {
    return this.http.post(this.apiUrl, {
      titulo,
      descripcion,
      direccion,
      categoria,
      contraparteId,
      zoneId
    }, {
      headers: this.getHeaders()
    });
  }

  misCasos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-casos`, {
      headers: this.getHeaders()
    });
  }
}