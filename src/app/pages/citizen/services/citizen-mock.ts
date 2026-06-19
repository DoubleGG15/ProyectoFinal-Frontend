import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

// Definimos los estados exactos que te pidieron en los requisitos
export type CaseState = 'nuevo' | 'asignado' | 'en mediación' | 'resuelto' | 'cerrado';

export interface CitizenCase {
  id: string;
  title: string;
  status: CaseState;
  description: string;
  agreementDetails?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitizenMockService {
  
  // Nuestro "Caso" de prueba con datos simulados
  private mockCase: CitizenCase = {
    id: 'CASO-2026-089',
    title: 'Conflicto por linderos de propiedad',
    status: 'en mediación', // Cambia este valor para probar la línea de tiempo luego
    description: 'Diferencias sobre la ubicación exacta del muro divisorio.',
    agreementDetails: 'Ambas partes acuerdan contratar a un topógrafo independiente a costos divididos.'
  };

  constructor() { }

  // Simula obtener el estado del caso (tarda 500ms para que parezca real)
  getCaseStatus() {
    return of(this.mockCase).pipe(delay(500));
  }

  // Simula el envío de la respuesta en la pantalla de acuerdos
  submitAgreementDecision(accepted: boolean, feedback?: string) {
    console.log('Decisión del ciudadano:', accepted ? 'Aceptado' : 'Cambios solicitados', feedback);
    return of({ success: true, message: 'Respuesta guardada con éxito' }).pipe(delay(500));
  }

  // Simula el reporte de cumplimiento
  submitComplianceReport(reportData: any) {
    console.log('Reporte enviado al sistema:', reportData);
    return of({ success: true, trackingId: 'REP-9992' }).pipe(delay(500));
  }
}