import { InitPermission } from "./init-permission.";
import { Injectable, AfterViewInit } from "@angular/core";

// @Injectable()
export class AccessType extends InitPermission {
    btn_form_access = this.isLocked() ? 'Consultar' : 'Editar';
    constructor(
        module: string, 
        subModule: string, 
        title: string,
    ) {
        super(module, subModule, title);
        console.log('iniciou o teste');
        console.log(this.typePermission)
    }

    btn_edit_or_query() {
        let btn = this.btn_form_access;
        return (data:{ consent: string }, auth) => {
            if (typeof(auth) !== 'undefined' && auth.gru === 'acesso completo')
                return btn;
            if (typeof(data) === 'undefined')
                throw "Faltando os dados do processo";
            if (typeof(data.consent) !== 'undefined') {
                if (data.consent === 'r')
                    return 'Consultar';
                return btn;
            }
            return btn;
        }
    }

    doesTheUserHavePermission() {
        console.log(typeof(this.typePermission))
        // if ( typeof(this.typePermission) === array ) {

        // }
    }

    /**
     * Metodo que verifica as permissões do usuário, se é leitura, modificação, etc... O callback será prioridade inferior as permissões do usuário
     * @param callback Função, caso o usuário passe uma função, a mesma será processada antes da verificação de permissões.
     */
    isLocked(callback: Function = null): boolean {
        let resp = false;
        if ( callback )
            resp = callback();
        if ( this.typePermission == 'r')
            resp = true;
        return resp;
    }
}