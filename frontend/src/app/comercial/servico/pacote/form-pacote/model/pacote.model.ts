import { Predicado } from '../../../servico/form-servico/model/predicado.model';

export interface Pacote {
    id_pacote: number;
    id_predicado: number;
    nome: string;
    predicados: Predicado[];
}
