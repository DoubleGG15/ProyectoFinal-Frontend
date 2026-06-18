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
  @Input() casoId: any;
  @Output() onGuardado = new EventEmitter<void>();

  sesion = {
    fecha: '',
    hora: '',
    linkReunion: '',
    notas: ''
  };

  constructor(private sessionService: SessionService) {}

  guardarSesion(): void {
    const datosEnvio = {
      casoId: this.casoId,
      ...this.sesion
    };

    this.sessionService.agendarSesion(datosEnvio).subscribe({
      next: () => {
        alert('¡Sesión agendada con éxito!');
        this.onGuardado.emit(); // Notifica al componente padre para regresar
      },
      error: (err) => {
        console.error('Error al agendar la sesión:', err);
      }
    });
  }
}