import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  readonly features = [
    {
      icon: '📋',
      title: 'Reporta tu Conflicto',
      description: 'Registra tu disputa vecinal de forma segura, adjunta evidencia y recibe seguimiento en tiempo real.',
    },
    {
      icon: '👨‍⚖️',
      title: 'Mediación Profesional',
      description: 'Mediadores capacitados gestionan el proceso, programan sesiones y facilitan el diálogo entre vecinos.',
    },
    {
      icon: '🔒',
      title: 'Acuerdos Inmutables',
      description: 'Una vez firmado por ambas partes, el acuerdo queda formalizado en el expediente digital para siempre.',
    },
    {
      icon: '📊',
      title: 'Transparencia Total',
      description: 'Reportes visuales del estado de los casos, tasas de resolución y tendencias de la comunidad.',
    },
  ];
}
