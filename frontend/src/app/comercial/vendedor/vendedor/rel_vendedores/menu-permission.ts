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
            // {
            //     displayName: 'Add Ocorrência',
            //     iconName: 'add_comment',
            //     event: 'ocorrencia'
            // },
            // {
            //     displayName: 'Notificações',
            //     children: [
            //         {
            //             displayName: 'Alertar Parceiro',
            //             iconName: 'group',
            //             event: 'alertar_parceiro'
            //         },
            //         {
            //             displayName: 'Solicitar BL',
            //             iconName: 'question_answer',
            //         },
            //         {
            //             displayName: 'Validar Recebimento BL',
            //             iconName: 'feedback',
            //         }
            //     ]
            // },

        ];
    }
}

