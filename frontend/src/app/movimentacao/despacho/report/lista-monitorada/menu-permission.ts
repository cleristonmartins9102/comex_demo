import { AccessType } from "src/app/shared/report/security/acess-type";

interface MenuProp {
    displayName: string;
    iconName: string;
    event: string;
    children?: any;
    expression?: any;
}

export class Menu extends AccessType {
    getWindowMenu() {
        return [
            {
                displayName: this.btn_form_access,
                iconName: 'close',
                event: this.typePermission,
                expression: (dados) => {
                    return true;
                }
            },
            {
                displayName: 'Gerar Processo',
                iconName: 'add_comment',
                event: 'gerar_processo',
                expression: (dados) => {
                    const status = dados.status;
                    const eventos = dados.complementos.eventos;
                    let response = this.typePermission === 'r' ? false : true;
                    if (response && (typeof(eventos) !== 'undefined' && eventos.length > 0)) {
                        eventos.forEach((evento) => {
                            if (evento.evento === 'g_processo') {
                                // console.log(dados, 'nao mostra');
                                response = false;
                            }
                        });
                    }
                    return response;
                }
            },
        ];
    }
}

