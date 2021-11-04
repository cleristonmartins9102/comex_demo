export class Menu {
    getWindowMenu() {
        return [
            {
                displayName: 'Editar',
                iconName: 'close',
                event: 'rw',
                expression: (dados) => {
                    const eventos = dados.complementos.eventos;
                    let response = true;
                    if (typeof (eventos) !== 'undefined' && eventos.length > 0) {
                        eventos.forEach((evento) => {
                            if (evento.evento === 'g_fatura') {
                                // response = false;
                            }
                        });
                    }
                    return response;
                }
            },
            {
                displayName: 'Consultar',
                iconName: 'close',
                event: 'r',
                expression: (dados) => {
                    const eventos = dados.complementos.eventos;
                    let response = false;
                    if (typeof (eventos) !== 'undefined' && eventos.length > 0) {
                        eventos.forEach((evento) => {
                            if (evento.evento === 'g_fatura') {
                                response = true;
                            }
                        });
                    }
                    return response;
                }
            },
            {
                displayName: 'Add Ocorrência',
                iconName: 'add_comment',
                children: [
                    {
                        displayName: 'Geral',
                        iconName: 'question_answer',
                        event: 'ocorrencia',
                        expression: () => {
                            return true;
                        }
                    },
                ],
                expression: () => {
                    return true;
                }
            },
            {
                displayName: 'Tracking',
                children: [
                    {
                        displayName: 'Solicitar o Cadastro',
                        iconName: 'group',
                        event: 'alertar_parceiro',
                        expression: (dados: { bl: string, complementos: {container: any[]}, }): boolean => {
                          return false;
                        }
                    },
                    {
                        displayName: 'Solicitar DI/DTA',
                        iconName: 'question_answer',
                        event: 'solicitar_di_dta',
                        expression: (dados: { dta_prevista_atracacao: string, terminal_atracacao: string, bl: string, complementos: { documento: any[], eventos: {evento: string}[], container: any[]}, }): boolean => {
                            const lenSolDiDta = dados.complementos.eventos.filter( evento => evento.evento === 'solicitado_di_dta').length;
                            const lenDoc = typeof(dados.complementos.documento) != 'undefined' 
                                ? dados.complementos.documento.length
                                : []
                            let resp = true;
                            if (lenDoc > 0) resp = false;
                            // if (lenSolBlSend >= this.limiteTentativa ) {
                            //     resp = false;
                            // } else if (dados.complementos.container.length === 0) {
                            //     resp = false;
                            // } else if (!dados.bl) {
                            //     resp = false;
                            // } else if (!dados.terminal_atracacao) {
                            //     resp = false;
                            // } else if (!dados.dta_prevista_atracacao) {
                            //     resp = false;
                            // }
                            return resp;
                        }


                    }
                ]
            }
        ];
    }
}

