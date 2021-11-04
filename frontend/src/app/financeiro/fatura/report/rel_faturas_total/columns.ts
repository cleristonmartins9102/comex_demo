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
      // {
      //   nameView: 'Captação',
      //   nameDB: 'captacao_numero',
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
      // {
      //   nameView: 'Documento',
      //   nameDB: 'documento',
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
        nameView: 'Terminal Atracação',
        nameDB: 'terminal_atracacao',
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
        nameView: 'Terminal Redestinação',
        nameDB: 'terminal_redestinacao',
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
      //   nameView: 'CIF',
      //   nameDB: 'valor_mercadoria',
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
        nameView: 'valor total',
        nameDB: 'valor',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'coin',
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
        nameView: 'valor custo ',
        nameDB: 'valor_custo',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'coin',
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
      //   nameView: 'valor imposto interno ',
      //   nameDB: 'imposto_interno_valor',
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
      // {
      //   nameView: 'valor comissões',
      //   nameDB: 'vl_com_tot',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'coin',
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
        nameView: 'valor lucro ',
        nameDB: 'valor_lucro',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'coin',
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
        nameView: 'data emissão',
        nameDB: 'dta_emissao',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'date',
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
          type: 'date',
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
      // {
      //   nameView: 'margem',
      //   nameDB: 'margem_lucro',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'input',
      //     style: [
      //       'text-captalize'
      //     ],
      //     dataType: 'char',
      //     condition: {
      //       icon: 'monetization_on',
      //       expression: (dados, column) => {
      //         if (typeof (dados.margem_lucro) !== 'undefined') {
      //           const margemLucro = dados.margem_lucro;
      //           if (margemLucro <= 30) {
      //             return '#FF5252';
      //           }
      //           if (margemLucro >= 30.1 && margemLucro <= 50) {
      //             return '#1565C0';
      //           }
      //           if (margemLucro >= 50.1) {
      //             return '#388E3C';
      //           }
      //         }
      //       }
      //     },
      //     // tooltip: 'Carga captada, solicitar a documentação.'
      //   }
      // },
      {
        nameView: 'vendedor',
        nameDB: 'vendedor',
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
      // {
      //   nameView: 'status',
      //   nameDB: 'status',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'input',
      //     style: [
      //       'text-captalize'
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
      // {
      //   nameView: 'cliente',
      //   nameDB: 'cliente_nome',
      //   config: {
      //     showInList: true,
      //     showInFilter: true,
      //     type: 'input',
      //     style: [
      //       'text-captalize'
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
      // {
      //   nameView: 'ações',
      //   nameDB: 'acoes',
      //   config: {
      //     showInList: true,
      //     showInFilter: false,
      //     type: 'menu',
      //     style: [
      //       'text-captalize'
      //     ],
      //     condition: {
      //       expression: (dados, column) => {
      //         return false;
      //       }
      //     }
      //   }
      // }
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
      }
      // {
      //   subTableTitle: 'itens',
      //   subTableDescription: 'informações da proposta',
      //   ico: 'assignment_turned_in',
      //   buttons: [
      //     {
      //       nameView: 'Descrição',
      //       nameDB: 'descricao',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'Data Início',
      //       nameDB: 'dta_inicio',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'date'
      //       }
      //     },
      //     {
      //       nameView: 'Data Final',
      //       nameDB: 'dta_final',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'date'
      //       }
      //     },
      //     {
      //       nameView: 'Período',
      //       nameDB: 'periodo',
      //       config: {
      //         showInList: true,
      //         showInFilter: false,
      //         type: 'input',
      //         dataType: 'input'
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

