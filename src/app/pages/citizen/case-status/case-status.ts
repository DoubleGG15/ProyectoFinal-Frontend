import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenMockService, CitizenCase, CaseState } from '../services/citizen-mock.service';

@Component({
  selector: 'app-case-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" *ngIf="caso">
      <h2>Estado de tu Conflicto</h2>
      <div class="card">
        <h3>{{ caso.title }}</h3>
        <p>{{ caso.description }}</p>
      </div>

      <div class="timeline">
        <div *ngFor="let step of listaEstados; let i = index" 
             class="timeline-item" 
             [class.active]="i <= indexActual">
          <div class="circle">{{ i + 1 }}</div>
          <span class="label">{{ step | titlecase }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 2rem auto; padding: 1rem; font-family: sans-serif; }
    .card { background: #fff; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 2rem; border-left: 5px solid #3498db; }
    .timeline { display: flex; justify-content: space-between; position: relative; margin-top: 3rem; }
    .timeline::before { content: ''; position: absolute; top: 20px; left: 0; width: 100%; height: 4px; background: #e0e0e0; z-index: 1; }
    .timeline-item { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; flex: 1; }
    .circle { width: 40px; height: 40px; border-radius: 50%; background: #e0e0e0; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; transition: all 0.3s; }
    .label { margin-top: 0.5rem; font-size: 0.85rem; color: #7f8c8d; font-weight: 500; }
    .timeline-item.active .circle { background: #2ecc71; box-shadow: 0 0 10px rgba(46, 204, 113, 0.5); }
    .timeline-item.active .label { color: #27ae60; font-weight: bold; }
  `]
})
export class CaseStatusComponent implements OnInit {
  caso?: CitizenCase;
  listaEstados: CaseState[] = ['nuevo', 'asignado', 'en mediación', 'resuelto', 'cerrado'];
  indexActual = 0;

  constructor(private mockService: CitizenMockService) {}

  ngOnInit() {
    this.mockService.getCaseStatus().subscribe(data => {
      this.caso = data;
      this.indexActual = this.listaEstados.indexOf(data.status);
    });
  }
}