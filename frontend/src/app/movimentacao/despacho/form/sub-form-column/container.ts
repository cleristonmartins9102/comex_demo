interface Column {
    placeholder;
    type;
    config;
    generalname?: string;
}

export class ColumnContainer {
    column: Column[];
    getCol() {
        this.column = [
            // Descrever as configuracoes das colunas e dos elementos do subformulario
            {
                placeholder: 'Código',
                type: 'input',
                config: {
                    width: 6,
                    element: {
                        required: true,
                        value: 'numero',
                        formcontrolname: 'codigo',
                    }
                }
            },
            {
                // Ser for do tipo select, tem esses campos a extras
                placeholder: 'Tipo',
                type: 'select',
                generalname: 'conteinertipo',
                config: {
                    width: 6,
                    element: {
                        required: true,
                        value: 'numero',
                        formcontrolname: 'tipo_container',
                        // Se sem valor estatico usa esses campos até isFor
                        isFor: true,
                        service: true,
                        // Usa caso tiver campos estaticos
                        option: {
                            id: 'id_containertipo',
                            legend: 'tipo',
                            values: null,
                            type: 'char',
                            style:
                                {
                                    'text-transform': 'upper',
                                }
                        }
                    }
                }
            }
        ];
        return this.column;
    }
}
