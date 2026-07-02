export interface AuthResponse {
  token: string;
  usuarioId: string;
  nombre: string;
  email: string;
  rol: string;
  expiraEn: number;
}
