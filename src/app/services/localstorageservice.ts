import { Injectable } from '@angular/core';
import { treinoAcademia } from '../mocks/treinos';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  checkExisteTreinoSalvoNoLocalStorage(): any {
    console.log('Verificando treino salvo no local storage...');
    const treinoSalvo = localStorage.getItem('treinoAcademia');
    console.log('treinoSalvo:', treinoSalvo);
    if (treinoSalvo) {
      console.log('Treino salvo encontrado no local storage:', JSON.parse(treinoSalvo));
      return JSON.parse(treinoSalvo);
    } else {
      console.log('Nenhum treino salvo encontrado no local storage.');
      localStorage.setItem('treinoAcademia', JSON.stringify(treinoAcademia));
      return treinoAcademia;
    }
  }

  updateTreinoNoLocalStorage(treino: any): void {
    console.log('Atualizando treino no local storage:', treino);
    localStorage.setItem('treinoAcademia', JSON.stringify(treino));
  }

}
