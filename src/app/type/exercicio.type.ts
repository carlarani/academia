export interface Exercicio {
    control: string;
    nome: string;
    carga: number;
}

export interface Treino {
    treinoA: Exercicio[];
    treinoB: Exercicio[];
    treinoC: Exercicio[];
}