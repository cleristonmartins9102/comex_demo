import { Cidades } from 'src/app/shared/model/cidades-br.model';

export interface Porto {
    id_porto: number;
    nome: string;
    email_princing: string;
    id_cidade: Cidades;
}
