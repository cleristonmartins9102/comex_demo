interface Column {
    placeholder;
    type;
    config;
    generalname?: string;
}

export class ColumnBreakBulk {
    column: Column[];
    getCol() {
        this.column = [
            // Descrever as configuracoes das colunas e dos elementos do subformulario
            {
                placeholder: 'Peso Bruto',
                type: 'input',
                config: {
                    width: 6,
                    element: {
                        required: true,
                        value: 'numero',
                        formcontrolname: 'pesoBruto',
                    }
                }
            },
            {
                // Ser for do tipo select, tem esses campos a extras
                placeholder: 'Metro Cúbico',
                type: 'input',
                generalname: 'metroCubico',
                config: {
                    width: 6,
                    element: {
                        required: true,
                        value: 'numero',
                        formcontrolname: 'metroCubico',
                    }
                }
            }
        ];
        return this.column;
    }
}
