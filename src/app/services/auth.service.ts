import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponse, RegisterResponse} from '../models/user.model';

// Injectable significa que Angular puede usar este servicio en cualquier componente
// providedIn: 'root' significa que solo existe una instancia, no es necesario crear una cada vez
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // La URL base del backend, si cambia el puerto, cambiarlo aqui
  private apiUrl = 'http://localhost:5235/api/Auth';

  // HttpClient es un servicio de Angular para hacer http requests
  // Inyeccion de dependencias...
  constructor(private http: HttpClient) { }

  // Mandar el formulario al servidor y devolvera un Observable
  // Es como una promesa que avisa cuando la respuesta llega desde el server
  // Suscribe que ayuda a procesarla cuando la recibimos
 register(
  fullName: string,
  email: string,
  address: string,
  password: string,
  role: string
): Observable<RegisterResponse> {

  return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, {
    fullName,
    email,
    address,
    password,
    role
  });
}

  // Manda el email y password al server y recibimos un token JWT, si funciona
  login(email: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  // Guardar el token en localStorage para que no se pierda el recargar la pagina
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Eliminar el token guardado (log out)
  logout(): void {
    localStorage.removeItem('token');
  }

  // Verificar si hay un token activo (cuando ya se hizo log in)
  isLoggedIn() : boolean {
    return this.getToken() !== null;
  }

  // Buscar el token guardado
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
