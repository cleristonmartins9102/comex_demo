import { InitPermission } from "src/app/shared/report/security/init-permission.";
import { AccessType } from "src/app/shared/report/security/acess-type";

export class Menu extends AccessType {
    limiteTentativa = 2;
    getWindowMenu() {
        return [
            {
                displayName: this.btn_form_access,
                iconName: 'close',
                event: this.typePermission,
                expression: (dados) => {
                    // const eventos = dados.complementos.eventos;
                    // if (typeof(eventos) !== 'undefined' && eventos.length > 0) {
                    //     eventos.forEach((evento) => {
                    //         if (evento.evento === 'g_liberacao') {
                    //             return false;
                    //         } else {
                    //             return true;
                    //         }
                    //     });
                    // } else {
                        return true;
                    // }
                }
            },
            
            {
                displayName: 'Imprimir',
                iconName: 'close',
                event: 'imprimir_fatura',
                expression: (dados) => {
                            let response = this.typePermission === 'r' ? false : true;
                            return (response && (typeof(dados.status) !== 'undefined' && dados.status === 'Fechada')) 
                }
            },
            {
                displayName: 'Gerar Complementar',
                iconName: 'close',
                event: 'gerar_complementar',
                 expression: (dados) => {
                            let response = this.typePermission === 'r' ? false : true;
                            if (response && (typeof(dados.status) !== 'undefined' && dados.status === 'Fechada'))
                                response = !dados.cheia;                    
                            return response;
                        }
            },
            {
                displayName: 'Liberar Complementares',
                iconName: 'close',
                event: 'liberar_complementar',
                 expression: (dados) => {
                            let response = this.typePermission === 'r' ? false : !dados.isC;
                            if (response && (typeof(dados.status) !== 'undefined' && dados.status === 'Fechada'))
                                response = dados.cheia;                         
                            return response;
                        }
            },
            {
                displayName: 'Recalcular',
                iconName: 'close',
                event: 'recalcular',
                expression: (dados) => {
                    let response = this.typePermission === 'r' ? false : true;
                    return (response && (typeof(dados.status) !== 'undefined' && (dados.status === 'Aberta' || ( dados.status === 'Prévia' && dados.recalculo !== 'sim' ) || dados.status === 'Paga') || dados.isC) || !(dados.modelo === 'Armazenagem' || dados.modelo === 'Exportação'))
                }
            },
            {
                displayName: 'Tracking',
                children: [
                    {
                        displayName: 'Enviar Fatura',
                        iconName: 'question_answer',
                        event: 'enviar_fatura',
                        expression: (dados: any) => {
                            // const lenSolBlSend = dados.complementos.eventos.filter( evento => evento.evento === 'solicitado_bl').length;
                            // const lenDocBl = dados.complementos.documentos.filter( doc => doc.tipodocumento === 'bl').length;
                            let resp = true;
                            if (dados.id_faturastatus != '2') resp = false;
                            
                            // } else if (dados.complementos.container.length === 0) {
                            //     resp = false;
                            // } else if (!dados.bl) {
                            //     resp = false;
                            // } else if (!dados.terminal_atracacao) {

                            //     resp = false;
                            // } else if (!dados.dta_prevista_atracacao) {
                            //     resp = false;
                            // }
                            return resp;
                        }
                    },
                ],
                expression: (dados) => {
                    return this.typePermission === 'r' ? false : true;
                }
            },
          ];
    }
}

