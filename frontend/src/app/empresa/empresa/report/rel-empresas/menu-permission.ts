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
        ];
    }
}

