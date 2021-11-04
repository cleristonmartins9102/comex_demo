import { AccessType } from "src/app/shared/report/security/acess-type";

export class Menu extends AccessType {
    getWindowMenu() {
        return [
            {
                displayName: 'Gerar Processo',
                iconName: 'close',
                event: 'gerar_processo',
                expression: (dados) => {
                    const eventos = dados.complementos.eventos;
                    let response = this.typePermission === 'r' ? false : true;
                    if (response && (typeof (eventos) !== 'undefined' && eventos.length > 0)) {
                        eventos.forEach((evento) => {
                            if (evento.evento === 'g_processo') {
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

