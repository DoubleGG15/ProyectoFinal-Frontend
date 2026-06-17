import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = '/api/sesiones'; 

  constructor(private http: HttpClient) { }

  // GET /api/sesiones
  listarSesiones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST /api/sesiones/agendar
  agendarSesion(sesionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agendar`, sesionData);
  }
}
