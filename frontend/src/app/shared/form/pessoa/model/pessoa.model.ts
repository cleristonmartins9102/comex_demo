import { Papel } from './papel.model';
import { Endereco } from './endereco.model';
import { Contato } from './contato.model';

export interface Pessoa {
    tipo: string;
    nome: string;
    id_individuo: string;
    endereco: Endereco;
    papel: Papel[];
    contato: Contato[];
    ie: string;
    rg: string;
}
