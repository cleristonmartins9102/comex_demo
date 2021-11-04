import { Terminal } from './terminal.model';
import { Container } from '../../container/model/container.model';

export interface Complementos {
    terminal_atracacao: Terminal[];
    terminal_redestinacao: Terminal[];
    containeres: Container[];
}
