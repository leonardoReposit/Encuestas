import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VotoRequest } from '../models/voto-request.interface';
import { Resultado } from '../models/resultado.interface';

@Injectable({ providedIn: 'root' })
export class VotoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://sistema-encuestas-backend.onrender.com/api/encuestas';

  votar(encuestaId: string, data: VotoRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${encuestaId}/votar`, data);
  }

  resultados(encuestaId: string): Observable<Resultado[]> {
    return this.http.get<Resultado[]>(`${this.apiUrl}/${encuestaId}/resultados`);
  }
}
