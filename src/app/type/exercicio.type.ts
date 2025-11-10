export interface Exercicio {
    control: string;
    nome: string;
    carga: number;
    series: number;
    repeticoes: number;
    clicked?: boolean;
    seriesExecutadas: number;
}

export type Treino = Exercicio[];

export type Treinos = Treino[];