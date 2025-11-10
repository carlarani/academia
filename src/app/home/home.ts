import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

import { FormBuilder, FormsModule } from '@angular/forms';
import { LocalStorageService } from '../services/localstorageservice';
import { Exercicio, Treino, Treinos } from '../type/exercicio.type';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ButtonModule, MatTabsModule, MatCardModule, MatChipsModule, InputNumberModule, ButtonModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})
export class Home implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(LocalStorageService);
  treinosInit: Treinos | undefined;
  treinoA = [] as Treino;
  treinoB = [] as Treino;
  treinoC = [] as Treino;

  ngOnInit(): void {
    this.treinosInit = this.service.checkExisteTreinoSalvoNoLocalStorage();
    this.treinoA = this.treinosInit?.[0] ?? [];
    this.treinoB = this.treinosInit?.[1] ?? [];
    this.treinoC = this.treinosInit?.[2] ?? [];
    console.log('ngOnInit - treinoInit', this.treinosInit);
  }

  onChangeValues(): void {
    console.log('onChangeCargaValue - treinoInit', this.treinosInit);
    this.service.updateTreinoNoLocalStorage(this.treinosInit);
  }

  marcarExecucaoSerie(exercicio: Exercicio): void {
    console.log('marcarExecucaoSerie - exercicio antes:', exercicio);
    exercicio.seriesExecutadas += 1;
    exercicio.clicked = !exercicio.clicked;
    if (exercicio.seriesExecutadas <= exercicio.series) {
      setTimeout(() => {
        exercicio.clicked = !exercicio.clicked
      }, 30000);
    }
  }
}
