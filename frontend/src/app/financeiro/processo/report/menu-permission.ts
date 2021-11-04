import { InitPermission } from "src/app/shared/report/security/init-permission.";
import { AccessType } from "src/app/shared/report/security/acess-type";

export class Menu extends AccessType {
    getWindowMenu() {
        return [
            {
                displayName: this.btn_form_access,
                iconName: 'close',
                event: this.typePermission,
                expression: (dados, logged) => {
                    const eventos = dados.complementos.eventos;
                    let resp = true;
                    // if ((typeof(eventos) !== 'undefined' && eventos.length > 0) && 
                    //     (
                    //         logged.gru !== 'administrador' && 
                    //         logged.gru !== 'gerente financeiro'
                    //     )
                    // ) {
                    //     eventos.forEach((evento) => {
                    //         if (evento.evento === 'g_fatura') {
                    //             resp = false;
                    //         }
                    //     });
                    // }
                    eventos.forEach((evento) => {
                        // if (evento.evento === 'g_fatura') {
                        //     resp = false;
                        // }
                    });
                    return resp;
                }
            },
            {
                displayName: 'Gerar Fatura',
                iconName: 'close',
                event: 'gerar_fatura',
                expression: (dados) => {
                    const eventos = dados.complementos.eventos;
                    let response = this.typePermission === 'r' ? false : true;
                    if (response && (typeof (eventos) !== 'undefined' && eventos.length > 0)) {
                        eventos.forEach((evento) => {
                            if (evento.evento === 'g_fatura') {
                                response = false;
                            }
                        });
                    }
                    if (dados.status !== 'Fechado') {
                        response = false;
                    }
                    return response;
                }
            },
            // {
            //     displayName: 'Add Ocorrência',
            //     iconName: 'add_comment',
            //     children: [
            //         {
            //             displayName: 'Geral',
            //             iconName: 'question_answer',
            //             event: 'ocorrencia',
            //             expression: () => {
            //                 return true;
            //             }
            //         },
            //     ],
            //     expression: () => {
            //         return true;
            //     }
            // },
        ];
    }
}

