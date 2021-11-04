export class Menu {
    getWindowMenu() {
        return [
            {
                displayName: 'Editar',
                iconName: 'close',
                event: 'rw',
                expression: () => {
                    return true;
                }
            },
            {
                displayName: 'Versionar',
                iconName: 'close',
                event: 'versionar',
                expression: () => {
                    return true;
                }
            },
            {
                displayName: 'Renovar',
                iconName: 'close',
                event: 'renovar',
                expression: () => {
                    return true;
                }
            },
        ];
    }
}

