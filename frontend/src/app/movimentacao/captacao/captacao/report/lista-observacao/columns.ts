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
        nameView: 'numero',
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
      // {
      //   nameView: 'proposta',
      //   nameDB: 'proposta',
      //   config: {
      //     showInList: true,
      //     showInFilter: false,
      //     type: 'input',
      //     dataType: 'char',
      //      condition: {
      //       expression: (dados, column) => {
      //         return false;
      //       }
      //     },
      //     // tooltip: 'Carga captada, solicitar a documentação.'
      //   }
      // },
      {
        nameView: 'importador',
        nameDB: 'cliente_nome',
        config: {
          showInList: true,
          showInFilter: true,
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
        nameView: 'Identificador',
        nameDB: 'cliente_cnpj',
        config: {
          showInList: true,
          showInFilter: true,
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
        nameView: 'despachante',
        nameDB: 'despachante',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },

      {
        nameView: 'transportadora',
        nameDB: 'transportadora',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'navio',
        nameDB: 'nome_navio',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'hbl',
        nameDB: 'bl',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-upper'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'mbl',
        nameDB: 'mbl',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-upper'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'Contêiner 20',
        nameDB: 'containeres20',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'Quantidade 20',
        nameDB: 'containeresQtd20',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'Contêiner 40',
        nameDB: 'containeres40',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'Quantidade 40',
        nameDB: 'containeresQtd40',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'terminal redestinação',
        nameDB: 'terminal_redestinacao',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'terminal atracação',
        nameDB: 'terminal_atracacao',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'Data de envio parceiro',
        nameDB: 'dta',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'date',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'data prevista atracação',
        nameDB: 'dta_prevista_atracacao',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'date',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'data atracação',
        nameDB: 'dta_atracacao',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'date',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
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
                      matChip.push({
                        color: '#ff9f43',
                        matTooltip: 'Gerado Liberação',
                        icon: 'GL'
                      });
                      break;
                    default:
                      break;
                  }
                });
                return matChip;
              }
              // Verificando se possue notificacao
              if (dados.complementos.notificacao.length > 0) {
                const matChip: Array<any> = [];
                dados.complementos.notificacao.forEach(((d: Notificacao) => {
                  switch (d.notificacao) {
                    case 'solicitado-bl':
                      matChip.push({
                        color: '#ff9f43',
                        matTooltip: 'Solicitado documento BL',
                        icon: 'SB'
                      });
                      break;
                    default:
                      break;
                  }
                }));
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
      {
        subTableTitle: 'proposta',
        subTableDescription: 'informações da proposta',
        ico: 'assignment_turned_in',
        buttons: [
          {
            nameView: 'número',
            nameDB: 'numero',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'cliente',
            nameDB: 'cliente',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'coadjuvante',
            nameDB: 'coadjuvante',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          // {
          //   nameView: 'contato',
          //   nameDB: 'grupodecontato',
          //   config: {
          //     showInList: true,
          //     showInFilter: false,
          //     type: 'input',
          //     dataType: 'input'
          //   }
          // },
          {
            nameView: 'status',
            nameDB: 'status',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },

        ],
      },
      {
        subTableTitle: 'container',
        subTableDescription: 'containeres',
        ico: 'assignment_turned_in',
        buttons: [
          {
            nameView: 'código',
            nameDB: 'codigo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'dimensao',
            nameDB: 'dimensao',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'tipo',
            nameDB: 'tipo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
        ],
      },
    ]
  };

  getTablePrimary() {
    return this.columnsTablePrimary;
  }

  getTableSecundary() {
    return this.columnsTableSecundary;
  }

}

