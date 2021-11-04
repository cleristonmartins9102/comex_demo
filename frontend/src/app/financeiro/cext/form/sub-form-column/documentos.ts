export class ColumnDocumentos {
    getCol() {
        return [
            // Descrever as configuracoes das colunas e dos elementos do subformulario
            {
                placeholder: 'Tipo',
                type: 'input',
                config: {
                    width: 5,
                    element: {
                        required: false,
                        formcontrolname: 'tipo',
                    }
                }
            },
            {
                // Ser for do tipo select, tem esses campos a extras
                placeholder: 'Tipo',
                type: 'upload',
                config: {
                    width: 2,
                    element: {
                        required: false,
                        formcontrolname: 'id_documento',
                        // Se sem valor estatico usa esses campos até isFor
                        isFor: false,
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
