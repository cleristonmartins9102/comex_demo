import { Injectable, inject } from "@angular/core";

import { AutorizatedService } from "src/app/login/service/autorizated.service";

/**
 * Classe para definir 
 */
@Injectable()
export abstract class InitPermission {
    permission: any = [];
    /**
     * 
     * @param module Modulo da aplicação Ex. financeiro
     * @param subModule SubModulo do Modulo Ex. fatura
     * @param title Titulo do report do Modulo Ex. faturas
     */
    constructor(
        private module: string, 
        private subModule: string, 
        private title: string, 
    ) {
        const security = new AutorizatedService;
        let permission = security.autorizatedSubModule(module);
        console.log(permission);
        if (permission) {
            permission = permission.filter( subModule => subModule.nome == this.subModule);
            if (permission.length > 0) {
                permission = permission[0].sub.filter( subModule => subModule.legend == this.title);
                if (permission.length > 0)
                    this.permission = permission[0];
            }
        }              
    }

    get typePermission() {
        return typeof this.permission.permissao !== 'undefined' 
                ? this.permission.permissao 
                : 'r';
    }
}