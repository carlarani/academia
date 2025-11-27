import { Injectable } from '@angular/core';
import { treinoAcademia } from '../mocks/treinos';
import { Exercicio, Treinos } from '../type/exercicio.type';

const TREINO_KEY = 'treinoAcademia';
const CARGAS_KEY = 'cargasTreino';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  cargasSalvas: Record<string, number> = {};

  checkExisteTreinoSalvoNoLocalStorage(): Treinos {
    console.log('Verificando treino salvo no local storage...');

    const treinoSalvo = this.getTreinoFromStorage();

    if (treinoSalvo) {
      console.log('Treino salvo encontrado:', treinoSalvo);
      this.restoreCargas(treinoSalvo);
      this.resetExercicioState(treinoSalvo);
      return treinoSalvo;
    }

    console.log('Nenhum treino salvo. Usando mock padrão.');
    this.resetExercicioState(treinoAcademia);
    this.saveTreinoToStorage(treinoAcademia);
    return treinoAcademia;
  }

  updateTreinoNoLocalStorage(treinos: Treinos): void {
    console.log('Atualizando treino no local storage');
    const cargas = this.extractCargas(treinos);
    this.saveTreinoToStorage(treinos);
    this.saveCargas(cargas);
  }

  // Private helpers

  private getTreinoFromStorage(): Treinos | null {
    try {
      const treinoSalvo = localStorage.getItem(TREINO_KEY);
      return treinoSalvo ? (JSON.parse(treinoSalvo) as Treinos) : null;
    } catch (error) {
      console.error('Erro ao obter treino do storage:', error);
      return null;
    }
  }

  private saveTreinoToStorage(treinos: Treinos): void {
    try {
      localStorage.setItem(TREINO_KEY, JSON.stringify(treinos));
    } catch (error) {
      console.error('Erro ao salvar treino no storage:', error);
    }
  }

  private restoreCargas(treinos: Treinos): void {
    this.cargasSalvas = this.getCargas();
    if (this.cargasSalvas) {
      const cargasSalvas = this.cargasSalvas;
      treinos.forEach(treino => {
        treino.forEach(exercicio => {
          exercicio.carga = cargasSalvas[exercicio.nome] ?? exercicio.carga ?? 0;
        });
      });
    }
  }

  private getCargas(): Record<string, number> {
    try {
      const cargasSalvas = localStorage.getItem(CARGAS_KEY);
      return cargasSalvas ? (JSON.parse(cargasSalvas) as Record<string, number>) : {};
    } catch (error) {
      console.error('Erro ao obter cargas do storage:', error);
      return {};
    }
  }

  private saveCargas(cargas: Record<string, number>): void {
    try {
      localStorage.setItem(CARGAS_KEY, JSON.stringify(cargas));
    } catch (error) {
      console.error('Erro ao salvar cargas no storage:', error);
    }
  }

  private extractCargas(treinos: Treinos): Record<string, number> {
    treinos.forEach(treino => {
      treino.forEach(exercicio => {
        this.cargasSalvas[exercicio.nome] = Number(exercicio.carga) || 0;
      });
    });
    return this.cargasSalvas;
  }

  private resetExercicioState(treinos: Treinos): void {
    treinos.forEach(treino => {
      treino.forEach(exercicio => {
        this.resetExercicio(exercicio);
      });
    });
  }

  private resetExercicio(exercicio: Exercicio): void {
    exercicio.clicked = false;
    exercicio.done = false;
    exercicio.seriesExecutadas = 0;
  }
}
