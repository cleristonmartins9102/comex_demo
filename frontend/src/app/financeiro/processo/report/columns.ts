import { FormCaptacaoComponent } from "src/app/movimentacao/captacao/captacao/form/form.component";

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
        nameDB: 'processo_numero',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          link: false,
          route: 'http://',
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
        nameView: 'Movimentação',
        nameDB: 'identificador',
        nameID: 'id_regime',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          link: true,
          style: [
            'text-captalize',
            'cursor-pointer'
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
        nameID: 'valor_mercadoria',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'coin',
          link: true,
          style: [
            'text-captalize',
            'cursor-pointer'
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
        nameView: 'regime',
        nameDB: 'regime_legenda',
        nameID: 'id_regime',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          link: true,
          style: [
            'text-captalize',
            'cursor-pointer'
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
      //   nameView: 'documento',
      //   nameDB: 'documento',
      //   nameID: 'documento',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'input',
      //     link: true,
      //     style: [
      //       'text-captalize',
      //       // 'cursor-pointer'
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
        nameView: 'proposta',
        nameDB: 'proposta_numero',
        nameID: 'proposta',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          link: true,
          dialogForm: FormCaptacaoComponent,
          style: [
            'text-captalize',
            'cursor-pointer'
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
        nameView: 'status',
        nameDB: 'status',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          link: false,
          route: 'http://',
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
        nameView: 'DDC',
        nameDB: 'tipo_operacao',
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
      // {
      //   nameView: 'tipo operação',
      //   nameDB: 'tipo_documento',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'input',
      //     link: false,
      //     route: 'http://',
      //     style: [
      //       'text-captalize',
      //     ],
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
        nameView: 'ações',
        nameDB: 'acoes',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'menu',
          link: true,
          route: 'http://',
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
          link: true,
          route: 'http://',
          style: [
            'text-captalize'
          ],
          condition: {
            expression: (dados: Complemento, column: any) => {
              const eventos = dados.complementos.eventos;
              if (typeof (eventos) !== 'undefined' && eventos.length > 0) {
                let matChip: Array<any> = [];
                dados.complementos.eventos.forEach((evento: any) => {
                  switch (evento.evento) {
                    case 'g_fatura':
                      matChip = [
                        {
                          app: 'financeiro',
                          module: 'fatura',
                          color: '#6495ED',
                          matTooltip: 'Gerado Fatura',
                          icon: 'GF'
                        }
                      ];
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
        subTableTitle: 'itens',
        subTableDescription: 'informações da proposta',
        ico: 'assignment_turned_in',
        buttons: [
          {
            nameView: 'Descrição',
            nameDB: 'descricao',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'Data Início',
            nameDB: 'dta_inicio',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'date'
            }
          },
          {
            nameView: 'Data Final',
            nameDB: 'dta_final',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'date'
            }
          },
          {
            nameView: 'Período',
            nameDB: 'periodo',
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

