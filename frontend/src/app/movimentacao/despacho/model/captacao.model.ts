import { Complementos } from './complementos.model';

export interface Captacao {
    numero: string;
    bl: string;
    cntr: string;
    complementos: Complementos;
    dta_prevista_atracacao: string;
}
