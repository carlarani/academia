import { Injectable } from '@angular/core';
import { treinoAcademia } from '../mocks/treinos';
import { Treinos } from '../type/exercicio.type';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  checkExisteTreinoSalvoNoLocalStorage(): any {
    console.log('Verificando treino salvo no local storage...');
    const treinoSalvo = localStorage.getItem('treinoAcademia');
    console.log('treinoSalvo:', treinoSalvo);
    if (treinoSalvo) {
      const possuiCargasSalvas = localStorage.getItem('cargasTreino');
      console.log('Treino salvo encontrado no local storage:', JSON.parse(treinoSalvo));
      const treinos = JSON.parse(treinoSalvo) as Treinos;
      let cargas: Record<string, number> = {};
      treinos.forEach(treino => {
        treino.forEach((exercicio) => {
          if (!possuiCargasSalvas) cargas[exercicio.nome] = exercicio.carga || 0;
          else {
            cargas = JSON.parse(possuiCargasSalvas) as Record<string, number>;
            exercicio.carga = cargas[exercicio.nome] || 0;
          }
          exercicio.clicked = false;
          exercicio.done = false;
          exercicio.seriesExecutadas = 0;
        });
      });
      localStorage.setItem('cargasTreino', JSON.stringify(cargas));
      return treinos;
    } else {
      console.log('Nenhum treino salvo encontrado no local storage.');
      localStorage.setItem('treinoAcademia', JSON.stringify(treinoAcademia));
      treinoAcademia.forEach(treino => {
        treino.forEach((exercicio) => {
          exercicio.clicked = false;
          exercicio.seriesExecutadas = 0;
          exercicio.done = false;
        });
      });
      return treinoAcademia;
    }
  }

  updateTreinoNoLocalStorage(treinos: Treinos): void {
    console.log('Atualizando treino no local storage:', treinos);
    const cargas: Record<string, number> = {};
    treinos.forEach(treino => {
      treino.forEach((exercicio) => {
        cargas[exercicio.nome] = exercicio.carga || 0;
      });
    });
    localStorage.setItem('cargasTreino', JSON.stringify(cargas));
    localStorage.setItem('treinoAcademia', JSON.stringify(treinos));
  }

}
