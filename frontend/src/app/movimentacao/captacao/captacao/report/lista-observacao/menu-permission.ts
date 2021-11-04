import { AccessType } from "src/app/shared/report/security/acess-type";

export class Menu extends AccessType {
    getWindowMenu() {
        return [
            {
                displayName: this.btn_edit_or_query(),
                iconName: 'close',
                event: this.typePermission,
                expression: (dados, log) => {
                    return true;
                }
            }
        ];
    }
}

