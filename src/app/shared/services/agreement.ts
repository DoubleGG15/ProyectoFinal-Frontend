import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AgreementService {
 private apiSesionesUrl = 'http://localhost:5235/api/Sesiones';
  private apiCasosUrl = 'http://localhost:5235/api/casos';

  constructor(private http: HttpClient) { }

  // POST /api/sesiones/acuerdo
  registrarAcuerdo(acuerdoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiSesionesUrl}/acuerdo`, acuerdoData);
  }

  // GET /api/casos
  listarCasosAsignados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiCasosUrl);
  }
}
