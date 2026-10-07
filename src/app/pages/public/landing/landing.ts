import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink], 
  template: `
    <div class="landing-wrapper">
      <div class="content-box">
        <h1 class="title">Portal de Mediación Ciudadana</h1>
        <p class="slogan">"Resolviendo conflictos con diálogo, justicia y empatía."</p>
        
        <div class="action-buttons">
          <a routerLink="/login" class="btn btn-primary">Iniciar Sesión</a>
          <a routerLink="/register" class="btn btn-outline">Registrarse</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .landing-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f7f6;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .content-box {
      text-align: center;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      max-width: 600px;
    }
    .title { color: #2c3e50; font-size: 2.5rem; margin-bottom: 0.5rem; }
    .slogan { color: #7f8c8d; font-size: 1.2rem; font-style: italic; margin-bottom: 2rem; }
    .action-buttons { display: flex; gap: 1rem; justify-content: center; }
    .btn { padding: 0.8rem 2rem; border-radius: 6px; text-decoration: none; font-weight: bold; transition: all 0.3s;}
    .btn-primary { background-color: #3498db; color: white; border: none; }
    .btn-primary:hover { background-color: #2980b9; }
    .btn-outline { background-color: transparent; color: #3498db; border: 2px solid #3498db; }
    .btn-outline:hover { background-color: #3498db; color: white; }
  `]
})
export class LandingComponent { }
