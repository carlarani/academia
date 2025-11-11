import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../services/localstorageservice';
import { Exercicio, Treino, Treinos } from '../type/exercicio.type';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  private readonly service = inject(LocalStorageService);

  // centralized state for the three treinos
  treinos: Treinos = [[], [], []];

  // convenience getters used by the template bindings
  get treinoA(): Treino {
    return this.treinos[0] ?? [];
  }
  get treinoB(): Treino {
    return this.treinos[1] ?? [];
  }
  get treinoC(): Treino {
    return this.treinos[2] ?? [];
  }

  ngOnInit(): void {
    const saved = this.service.checkExisteTreinoSalvoNoLocalStorage();
    if (saved && saved.length) {
      this.treinos = saved;
    }
  }

  onChangeValues(): void {
    this.save();
  }

  marcarExecucaoSerie(exercicio: Exercicio): void {
    const maxSeries = exercicio.series ?? 0;
    const executed = exercicio.seriesExecutadas ?? 0;

    if (executed >= maxSeries) {
      return; // nothing to do, already reached the max
    }

    exercicio.seriesExecutadas = executed + 1;
    exercicio.clicked = true;

    // auto-unset clicked after 30s (keeps UI feedback non-blocking)
    setTimeout(() => (exercicio.clicked = false), 30000);

    this.save();
  }

  // helps ngFor performance when rendering lists of exercicios
  trackByExercicio(_index: number, exercicio: Exercicio): string | number {
    return (exercicio as any)?.id ?? _index;
  }

  private save(): void {
    this.service.updateTreinoNoLocalStorage(this.treinos);
  }
}