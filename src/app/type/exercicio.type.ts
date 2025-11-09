export interface Exercicio {
    control: string;
    nome: string;
    carga: number;
    series: number;
    repeticoes: number;
    clicked?: boolean;
}

export type Treino = Exercicio[];

export type Treinos = Treino[];