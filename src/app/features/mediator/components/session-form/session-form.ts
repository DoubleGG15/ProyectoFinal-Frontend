import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../../shared/services/session';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-form.html',
  styleUrls: ['./session-form.css']
})
export class SessionForm {
  @Input() casoId: string = '';
  @Output() onGuardado = new EventEmitter<void>();

  sesion = {
    scheduledDate: '',
    scheduledTime: '',
    modality: 'Virtual',
    meetingLink: '',
    sessionNotes: ''
  };

  constructor(private sessionService: SessionService) {}

  guardarSesion(): void {
    const datosEnvio = {
      caseId: this.casoId,
      scheduledDate: this.sesion.scheduledDate,
      scheduledTime: this.sesion.scheduledTime,
      modality: this.sesion.modality,
      meetingLink: this.sesion.meetingLink,
      sessionNotes: this.sesion.sessionNotes
    };

    this.sessionService.agendarSesion(datosEnvio).subscribe({
      next: () => {
        alert('¡Sesión agendada con éxito!');
        this.onGuardado.emit();
      },
      error: (err: any) => {
        console.error('Error al agendar la sesión:', err);
        alert(err.error?.message || 'Error al agendar la sesión');
      }
    });
  }
}