import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgreementService } from '../../../../shared/services/agreement';

@Component({
  selector: 'app-agreement-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agreement-form.html',
  styleUrls: ['./agreement-form.css']
})
export class AgreementForm {
  @Input() casoId: string = '';
  @Output() onGuardado = new EventEmitter<void>();

  acuerdo = {
    agreementText: '',
    points: ''
  };

  constructor(private agreementService: AgreementService) {}

  guardarAcuerdo(): void {
    const datosEnvio = {
      caseId: this.casoId,
      agreementText: this.acuerdo.agreementText,
      points: [
        {
          description: this.acuerdo.points,
          deadline: new Date().toISOString()
        }
      ]
    };

    this.agreementService.registrarAcuerdo(datosEnvio).subscribe({
      next: () => {
        alert('¡Acuerdo registrado de manera formal!');
        this.onGuardado.emit();
      },
      error: (err) => {
        console.error('Error al registrar acuerdo:', err);
        alert(err.error?.message || 'Error al registrar acuerdo');
      }
    });
  }
}