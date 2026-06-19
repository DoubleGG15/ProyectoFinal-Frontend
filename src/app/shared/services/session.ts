import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:5235/api/Sesiones';

  constructor(private http: HttpClient) {}

  agendarSesion(sesionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agendar`, sesionData);
  }

  registrarAcuerdo(acuerdoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/acuerdo`, acuerdoData);
  }
}