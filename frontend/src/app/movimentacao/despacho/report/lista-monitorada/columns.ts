export interface Complemento {
  complementos: {
    eventos: string[];
    notificacao: Array<Notificacao>,
    proposta: Array<Object>,
    relevante: Array<Object>
  };
}

export interface Notificacao {
  notificacao: string;
}


export class ColumnsModel {
  // Construindo colunas
  columnsTablePrimary: Object[] =
    [
      // {
      //   nameView: 'checkbox',
      //   nameDB: 'checkbox',
      //   nameColId: 'id_proposta',
      //   config: {
      //     showInList: true,
      //     showInFilter: false,
      //     type: 'checkbox',
      //     condition: {
      //       expression: (dados, column) => {
      //         return false;
      //       }
      //     },
      //     tooltip: 'Carga captada, solicitar a documentação.'
      //   }
      // },
      {
        nameView: 'número',
        nameDB: 'numero',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'number',
           condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'proposta',
        nameDB: 'proposta',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'char',
           condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'Exportador',
        nameDB: 'exportador_nome',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'char',
           condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'DUE',
        nameDB: 'due',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'char',
           condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'criado em',
        nameDB: 'created_at',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'datetime',
           condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'atualizado em',
        nameDB: 'updated_at',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'datetime',
           condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'ações',
        nameDB: 'acoes',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'menu',
          style: [
            'text-captalize'
          ],
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'eventos',
        nameDB: 'eventos',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'eventos',
          style: [
            'text-captalize'
          ],
          condition: {
            expression: (dados: Complemento, column: any) => {
              const eventos = dados.complementos.eventos;
              if (typeof(eventos) !== 'undefined' && eventos.length > 0) {
                const matChip: Array<any> = [];
                dados.complementos.eventos.forEach((evento: any) => {
                  switch (evento.evento) {
                    case 'g_liberacao':
                      matChip.pop();
                      matChip.push({
                        app: 'liberacao',
                        module: 'liberacao',
                        color: '#ff9f43',
                        matTooltip: 'Gerado Liberação',
                        icon: 'GL'
                      });
                      break;

                    case 'g_processo':
                      matChip.pop();
                      matChip.push({
                        app: 'financeiro',
                        module: 'processo',
                        color: '#bf55ec',
                        matTooltip: 'Gerado Processo',
                        icon: 'GP'
                      });
                      break;

                    case 'g_fatura':
                      matChip.pop();
                      matChip.push({
                        app: 'financeiro',
                        module: 'fatura',
                        color: '#6495ED',
                        matTooltip: 'Gerado Fatura',
                        icon: 'GF'
                      });
                      break;
                    default:
                      break;
                  }
                });
                return matChip;
              }
            }
          }
        }
      },
    ];

  columnsTableSecundary: Object = {
    subTableWidth: 'description_md',
    tables: [
      // {
      //   subTableTitle: 'proposta',
      //   subTableDescription: 'informações da proposta',
      //   ico: 'assignment_turned_in',
      //   buttons: [
      //     {
      //       nameView: 'número',
      //       nameDB: 'numero',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'cliente',
      //       nameDB: 'cliente',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'coadjuvante',
      //       nameDB: 'coadjuvante',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
      //       }
      //     },
      //     // {
      //     //   nameView: 'contato',
      //     //   nameDB: 'grupodecontato',
      //     //   config: {
      //     //     showInList: true,
      //     //     showInFilter: false,
      //     //     type: 'input',
      //     //     dataType: 'input'
      //     //   }
      //     // },
      //     {
      //       nameView: 'status',
      //       nameDB: 'status',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
      //       }
      //     },

      //   ],
      // },
      // {
      //   subTableTitle: 'container',
      //   subTableDescription: 'containeres',
      //   ico: 'assignment_turned_in',
      //   buttons: [
      //     {
      //       nameView: 'código',
      //       nameDB: 'codigo',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'dimensao',
      //       nameDB: 'dimensao',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'tipo',
      //       nameDB: 'tipo',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
      //       }
      //     },
      //   ],
      // },
      // {
      //   subTableTitle: 'documentos',
      //   subTableDescription: 'documentos',
      //   ico: 'assignment_turned_in',
      //   buttons: [
      //     {
      //       nameView: 'nome documento',
      //       nameDB: 'nome_original',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'tipo',
      //       nameDB: 'tipodocumento',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'criado em',
      //       nameDB: 'created_at',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'datetime'
      //       }
      //     },
      //     {
      //       nameView: '',
      //       nameDB: 'token',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'ico',
      //         icoName: 'cloud_download'
      //       }
      //     },
      //   ],
      // },
    ]
  };

  getTablePrimary() {
    return this.columnsTablePrimary;
  }

  getTableSecundary() {
    return this.columnsTableSecundary;
  }

}

