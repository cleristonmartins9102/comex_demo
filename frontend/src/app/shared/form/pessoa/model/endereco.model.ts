import { Cidades } from 'src/app/shared/model/cidades-br.model';

export interface Endereco {
    logradouro: string;
    endereco: string;
    complemento: string;
    numero: number;
    cep: number;
    bairro: string;
    cidade: Cidades;
}
