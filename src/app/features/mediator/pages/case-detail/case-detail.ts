import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SessionForm } from '../../components/session-form/session-form';
import { AgreementForm } from '../../components/agreement-form/agreement-form';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, SessionForm, AgreementForm],
  templateUrl: './case-detail.html',
  styleUrl: './case-detail.css',
})
export class CaseDetail implements OnInit {
  casoId: string = '';
  mostrarSesion: boolean = false;
  mostrarAcuerdo: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.casoId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  abrirSesion(): void {
    this.mostrarSesion = true;
    this.mostrarAcuerdo = false;
  }

  abrirAcuerdo(): void {
    this.mostrarAcuerdo = true;
    this.mostrarSesion = false;
  }

  cerrarFormularios(): void {
    this.mostrarSesion = false;
    this.mostrarAcuerdo = false;
  }
}