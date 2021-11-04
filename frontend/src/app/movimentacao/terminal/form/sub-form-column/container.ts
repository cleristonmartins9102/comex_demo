export class ColumnContainer {
    getCol() {
        return [
            // Descrever as configuracoes das colunas e dos elementos do subformulario
            {
                placeholder: 'Código',
                type: 'input',
                config: {
                    width: 6,
                    element: {
                        required: true,
                        value: 'numero',
                        formcontrolname: 'numero',
                    }
                }
            },
            {
                // Ser for do tipo select, tem esses campos a extras
                placeholder: 'Dimensão',
                type: 'select',
                config: {
                    width: 6,
                    element: {
                        required: true,
                        value: 'numero',
                        formcontrolname: 'dimensao',
                        // Se sem valor estatico usa esses campos até isFor
                        isFor: true,
                        service: null,
                        // Usa caso tiver campos estaticos
                        option: {
                            values: [
                                30,
                                40
                            ]
                        }
                    }
                }
            }
        ];
    }
}
