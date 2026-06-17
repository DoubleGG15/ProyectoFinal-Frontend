import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementService } from '../../../../shared/services/agreement';

@Component({
  selector: 'app-assigned-cases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assigned-cases.html',
  styleUrls: ['./assigned-cases.css']
})
export class AssignedCasesComponent implements OnInit {
  // Aquí guardaremos la lista de casos que devuelva el servidor
  casos: any[] = [];

  constructor(private agreementService: AgreementService) {}

  ngOnInit(): void {
    this.cargarCasos();
  }

  cargarCasos(): void {
    this.agreementService.listarCasosAsignados().subscribe({
      next: (data) => {
        this.casos = data;
      },
      error: (err) => {
        console.error('Error al cargar los casos del mediador:', err);
      }
    });
  }
}
