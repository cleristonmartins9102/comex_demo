import { Predicado } from './predicado.model';

export interface Servico {
    id_servico: string;
    nome: string;
    predicados: Predicado[];
}
