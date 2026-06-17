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
  @Input() casoId: any;
  @Output() onGuardado = new EventEmitter<void>();

  acuerdo = {
    tipoAcuerdo: 'Total',
    descripcion: '',
    compromisos: ''
  };

  constructor(private agreementService: AgreementService) {}

  guardarAcuerdo(): void {
    const datosEnvio = {
      casoId: this.casoId,
      ...this.acuerdo
    };

    this.agreementService.registrarAcuerdo(datosEnvio).subscribe({
      next: () => {
        alert('¡Acuerdo registrado de manera formal!');
        this.onGuardado.emit(); // Regresa al detalle
      },
      error: (err) => {
        console.error('Error al registrar acuerdo:', err);
      }
    });
  }
}