import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../services/localstorageservice';
import { Treino } from '../type/exercicio.type';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatTabsModule, MatCardModule, MatChipsModule, InputNumberModule, ButtonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})
export class Home implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(LocalStorageService);
  treinoInit: Treino | undefined;

  ngOnInit(): void {
    this.treinoInit = this.service.checkExisteTreinoSalvoNoLocalStorage();
    console.log('ngOnInit - treinoInit', this.treinoInit);
  }

  onChangeCargaValue(): void {
    console.log('onChangeCargaValue - treinoInit', this.treinoInit);
    this.service.updateTreinoNoLocalStorage(this.treinoInit);
  }
}
