import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ConflictCase } from '../../models/api.models';

/** Datos mock de Firestore — se reemplaza con endpoint real cuando el backend esté integrado */
const MOCK_CASOS_MEDIADOR: ConflictCase[] = [
  {
    id: '712a80b8-c03a-4e87-a887-f1b1f1a0f964',
    reporterId: 'ee5bc937-4a16-4f7b-8a08-f1b6e33d8b0a',
    reporterName: 'Usuario Reportante',
    respondentId: 'ace865b7-cd3b-4600-a7c3-54af3615c01d',
    respondentName: 'Contraparte',
    conflictType: 'ruido',
    description: 'El vecino del bloque Q casa 1A tuvo una fiesta ayer y hizo demasiada buya, no me dejo dormir',
    address: 'La Stibys',
    status: 'asignado',
    mediatorId: '8495a080-4ea0-4703-9ffb-64721d0b0efa',
    evidenceUrls: [],
  },
  {
    id: 'beb2d24a-8dcc-4eaf-bafb-53c5000000000',
    reporterId: 'ee5bc937-4a16-4f7b-8a08-f1b6e33d8b0a',
    reporterName: 'Usuario Reportante',
    respondentId: '',
    respondentName: 'Contraparte 2',
    conflictType: 'limites',
    description: 'Segundo caso registrado en Firestore.',
    address: 'Tegucigalpa',
    status: 'nuevo',
    mediatorId: '8495a080-4ea0-4703-9ffb-64721d0b0efa',
    evidenceUrls: [],
  },
];

@Injectable({
  providedIn: 'root',
})
export class AgreementService {
  private readonly apiBase = 'http://localhost:5235/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listarCasosAsignados(): Observable<ConflictCase[]> {
    return this.http
      .get<ConflictCase[]>(`${this.apiBase}/casos`, { headers: this.getHeaders() })
      .pipe(
        catchError((err) => {
          console.warn('Backend no disponible, usando datos mock:', err.message);
          return of(MOCK_CASOS_MEDIADOR);
        }),
      );
  }

  registrarAcuerdo(acuerdoData: object): Observable<object> {
    return this.http.post<object>(`${this.apiBase}/Sesiones/acuerdo`, acuerdoData, {
      headers: this.getHeaders(),
    });
  }
}