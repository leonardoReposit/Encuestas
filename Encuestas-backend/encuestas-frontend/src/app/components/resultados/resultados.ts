import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VotoService } from '../../services/voto.service';
import { Resultado } from '../../models/resultado.interface';

@Component({
  selector: 'app-resultados',
  imports: [RouterLink],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class Resultados implements OnInit {
  private readonly votoService = inject(VotoService);
  private readonly route = inject(ActivatedRoute);

  resultados: Resultado[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.votoService.resultados(id).subscribe({
      next: (data) => this.resultados = data
    });
  }

  get maxVotos(): number {
    return Math.max(...this.resultados.map(r => r.totalVotos), 1);
  }
}
