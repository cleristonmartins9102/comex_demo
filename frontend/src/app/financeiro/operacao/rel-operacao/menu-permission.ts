export class Menu {
    getWindowMenu() {
        return [
            {
                displayName: 'Gerar Processo',
                iconName: 'close',
                event: 'gerar_processo',
                expression: (dados) => {
                    const eventos = dados.complementos.eventos;
                    let response = true;
                    if (typeof (eventos) !== 'undefined' && eventos.length > 0) {
                        eventos.forEach((evento) => {
                            if (evento.evento === 'g_processo') {
                                response = false;
                            }
                        });
                    }
                    return response;
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

