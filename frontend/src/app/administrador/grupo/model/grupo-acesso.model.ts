import { Acesso } from "./acesso.module";

export interface GrupoAcesso {
    id_grupoacesso: string;
    grupo: string;
    membros: any[];
    acessos: Acesso[];
}
