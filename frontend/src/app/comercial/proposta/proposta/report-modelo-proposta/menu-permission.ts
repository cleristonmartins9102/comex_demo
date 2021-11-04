import { AccessType } from "src/app/shared/report/security/acess-type";

export class Menu extends AccessType {
    getWindowMenu() {
        return [
            {
                displayName: this.btn_form_access,
                iconName: 'close',
                event: this.typePermission,
                expression: () => {
                    return true;
                }
            },
            {
                displayName: 'Gerar Filhote',
                iconName: 'close',
                event: 'filhote',
                expression: () => {
                    let response = this.typePermission === 'r' ? false : true;
                    return response;
                }
            },

        ];
    }
}

