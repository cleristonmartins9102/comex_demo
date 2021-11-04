export class Menu {
    getWindowMenu() {
        return [
            {
                displayName: 'Editar',
                iconName: 'close',
                event: 'rw',
                expression: (dados) => {
                    // const eventos = dados.complementos.eventos;
                    // if (typeof(eventos) !== 'undefined' && eventos.length > 0) {
                    //     eventos.forEach((evento) => {
                    //         if (evento.evento === 'g_liberacao') {
                    //             return false;
                    //         } else {
                    //             return true;
                    //         }
                    //     });
                    // } else {
                        return true;
                    // }
                }
            },
            {
                displayName: 'Imprimir',
                iconName: 'close',
                event: 'imprimir_fatura',
                 expression: (dados) => {
                            if (typeof(dados.status) !== 'undefined' && dados.status === 'Fechada') {
                                return true;
                            } else {
                                return false;
                            }
                        }
            },
                // {
                //     displayName: 'Add Ocorrência',
                //     iconName: 'add_comment',
                //     children: [
                //         {
                //             displayName: 'Geral',
                //             iconName: 'question_answer',
                //             event: 'ocorrencia',
                //             expression: () => {
                //                 return true;
                //             }
                //         },
                //     ],
                //     expression: () => {
                //         return true;
                //     }
                // },
        ];
    }
}

