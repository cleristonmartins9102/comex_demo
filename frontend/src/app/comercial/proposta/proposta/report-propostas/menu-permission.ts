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
                displayName: 'Versionar',
                iconName: 'close',
                event: 'versionar',
                expression: (d) => {
                    let response = this.typePermission === 'r' ? false : true;
                    return response && !(d.status == 'inativa')
                }
            },
            {
                displayName: 'Renovar',
                iconName: 'close',
                event: 'renovar',
                expression: (d) => {
                    let response = this.typePermission === 'r' ? false : true;
                    return response && !(d.status == 'inativa')
                }
            },
        ];
    }
}

