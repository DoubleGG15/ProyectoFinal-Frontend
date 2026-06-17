// Esto es lo que el backend nos manda cuando el login es exitoso
// Solo trae el token porque es lo único que necesitan para auth
export interface LoginResponse {
  token: string;
}

// Esto es lo que el backend devuelve cuando alguien se registra
export interface RegisterResponse {
  id: string;
  fullName: string;
  email: string;
  address: string;
  role: string;
}