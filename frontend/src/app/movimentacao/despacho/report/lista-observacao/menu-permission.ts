export class Menu {
    getWindowMenu() {
        return [
            // {
            //     displayName: 'Editar',
            //     iconName: 'close',
            //     event: 'rw',
            //     expression: () => {
            //         return true;
            //     }
            // },
            {
                displayName: 'Consultar',
                iconName: 'close',
                event: 'r',
                expression: (dados) => {
                    return true;
                }
            },
            // {
            //     displayName: 'Add Ocorrência',
            //     iconName: 'add_comment',
            //     event: 'ocorrencia',
            //     expression: () => {
            //         return true;
            //     }
            // },
            // {
            //     displayName: 'Notificações',
            //     children: [
            //         {
            //             displayName: 'Solicitar Cadastro',
            //             iconName: 'group',
            //             event: 'alertar_parceiro',
            //             expression: () => {
            //                 return true;
            //             }
            //         },
            //         {
            //             displayName: 'Solicitar BL',
            //             iconName: 'question_answer',
            //             event: 'solicitar_bl',
            //         },
            //         {
            //             displayName: 'Validar Recebimento BL',
            //             iconName: 'feedback',
            //             expression: () => {
            //                 return true;
            //             }
            //         }
            //     ]
            // },
        ];
    }
}

