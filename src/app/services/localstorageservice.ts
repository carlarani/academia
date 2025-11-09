import { Injectable } from '@angular/core';
import { treinoAcademia } from '../mocks/treinos';
import { Treino, Treinos } from '../type/exercicio.type';

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
      const treinos = JSON.parse(treinoSalvo) as Treinos;
      treinos.forEach(treino => {
        treino.forEach((exercicio) => {
          exercicio.clicked = false;
        });
      });
      return treinos;
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
