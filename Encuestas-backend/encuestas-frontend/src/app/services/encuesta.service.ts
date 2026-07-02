import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/encuesta.interface';
import { EncuestaRequest } from '../models/encuesta-request.interface';
import { Opcion } from '../models/opcion.interface';
import { OpcionRequest } from '../models/opcion-request.interface';

@Injectable({ providedIn: 'root' })
export class EncuestaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://sistema-encuestas-backend.onrender.com/api/encuestas';

  listar(estado?: string): Observable<Encuesta[]> {
    const params = estado ? `?estado=${estado}` : '';
    return this.http.get<Encuesta[]>(`${this.apiUrl}${params}`);
  }

  obtener(id: string): Observable<Encuesta> {
    return this.http.get<Encuesta>(`${this.apiUrl}/${id}`);
  }

  crear(data: EncuestaRequest): Observable<Encuesta> {
    return this.http.post<Encuesta>(this.apiUrl, data);
  }

  cambiarEstado(id: string, estado: string): Observable<Encuesta> {
    return this.http.put<Encuesta>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  listarOpciones(encuestaId: string): Observable<Opcion[]> {
    return this.http.get<Opcion[]>(`${this.apiUrl}/${encuestaId}/opciones`);
  }

  crearOpcion(encuestaId: string, data: OpcionRequest): Observable<Opcion> {
    return this.http.post<Opcion>(`${this.apiUrl}/${encuestaId}/opciones`, data);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
