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
        nameView: 'fatura',
        nameDB: 'fatura_numero',
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
        nameView: 'modelo',
        nameDB: 'modelo',
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
        nameView: 'cliente',
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
        nameView: 'imo',
        nameDB: 'imo',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          link: false,
          route: 'http://',
          style: [
            'text-captalize',
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
        nameView: 'movimentação',
        nameDB: 'movimentacao_numero',
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
      // {
      //   nameView: 'processo',
      //   nameDB: 'processo_numero',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'input',
      //     style: [
      //       'text-captalize'
      //     ],
      //     dataType: 'char',
      //     condition: {
      //       expression: (dados, column) => {
      //         return false;
      //       }
      //     },
      //     // tooltip: 'Carga captada, solicitar a documentação.'
      //   }
      // },
      // {
      //   nameView: 'proposta',
      //   nameDB: 'proposta',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'input',
      //     style: [
      //       'text-captalize'
      //     ],
      //     dataType: 'char',
      //     condition: {
      //       expression: (dados, column) => {
      //         return false;
      //       }
      //     },
      //     // tooltip: 'Carga captada, solicitar a documentação.'
      //   }
      // },
      {
        nameView: 'Documento',
        nameDB: 'documento',
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
        nameView: 'Terminal Primário',
        nameDB: 'terminal_primario',
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
        nameView: 'Terminal Secundário',
        nameDB: 'terminal_secundario',
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
        nameView: 'CIF',
        nameDB: 'valor_mercadoria',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'coin',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'valor total',
        nameDB: 'valor',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'coin',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      // {
      //   nameView: 'valor custo ',
      //   nameDB: 'valor_custo',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'input',
      //     style: [
      //       'text-captalize'
      //     ],
      //     dataType: 'coin',
      //     condition: {
      //       expression: (dados, column) => {
      //         return false;
      //       }
      //     },
      //     // tooltip: 'Carga captada, solicitar a documentação.'
      //   }
      // },
      {
        nameView: 'status',
        nameDB: 'status',
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
        nameView: 'data emissão',
        nameDB: 'dta_emissao',
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
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'data vencimento',
        nameDB: 'dta_vencimento',
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
            expression: (dados: any, column: any) => {
              const eventos = dados.complementos.eventos;
              const lenSolDiDta = dados.complementos.eventos.filter( evento => evento.evento === 'soldidta').length;
              const lenGProcesso = dados.complementos.eventos.filter( evento => evento.evento === 'g_processo').length;
              const lenGFatura = dados.complementos.eventos.filter( evento => evento.evento === 'enviado_fatura').length;
              if (typeof(eventos) !== 'undefined' && eventos.length > 0) {
                const matChip: Array<any> = [];
                dados.complementos.eventos.forEach((evento: any) => {
                  switch (evento.evento) {
                    case 'enviado_fatura':
                      matChip.pop();
                      matChip.push({
                        app: 'financeiro',
                        module: 'processo',
                        color: '#e77f67',
                        matTooltip: 'Enviado Fautra',
                        icon: 'EF'
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
      {
        subTableTitle: 'contêiner',
        subTableDescription: 'contêineres',
        ico: 'assignment_turned_in',
        buttons: [
          {
            nameView: 'código',
            nameDB: 'codigo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'char'
            }
          },
          {
            nameView: 'tipo',
            nameDB: 'tipo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'char'
            }
          },
          {
            nameView: 'dimensão',
            nameDB: 'dimensao',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'char'
            }
          },
        ],
      },
      {
        subTableTitle: 'documentos',
        subTableDescription: 'documentos da fatura',
        ico: 'assignment_turned_in',
        buttons: [
          {
            nameView: 'nome documento',
            nameDB: 'nome_original',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'tipo',
            nameDB: 'tipodocumento',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'criado em',
            nameDB: 'created_at',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'datetime'
            }
          },
          {
            nameView: '',
            nameDB: 'token',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'ico',
              icoName: 'cloud_download'
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

