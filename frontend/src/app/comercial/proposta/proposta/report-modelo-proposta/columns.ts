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
      //     }
      //   }
      // },
      {
        nameView: 'numero',
        nameDB: 'numero',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'number',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'importador',
        nameDB: 'cliente',
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
          }
        }
      },
      {
        nameView: 'tipo',
        nameDB: 'tipo',
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
          }
        }
      },
      {
        nameView: 'data emissão',
        nameDB: 'dta_emissao',
        config: {
          showInList: true,
          showInFilter: false,
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
        nameView: 'data validade',
        nameDB: 'dta_validade',
        config: {
          showInList: true,
          showInFilter: false,
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
        nameView: 'prazo pagamento',
        nameDB: 'prazo_pagamento',
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
          }
        }
      },
      {
        nameView: 'regime',
        nameDB: 'regime',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'radio',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'qualificação',
        nameDB: 'qualificacao',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'radio',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
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
          }
        }
      },
      {
        nameView: 'data modificado',
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
    ];

  columnsTableSecundary: Object = {
    subTableWidth: 'description_md',
    tables : [
      {
        subTableTitle: 'serviços',
        subTableDescription: 'predicados da proposta',
        ico: 'assignment_turned_in',
        buttons: [
          {
            nameView: 'predicado',
            nameDB: 'predicado',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'descrição',
            nameDB: 'descricao',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'Período',
            nameDB: 'franquia_periodo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'dimensão',
            nameDB: 'dimensao',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'valor',
            nameDB: 'valor',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'coin'
            }
          },
          {
            nameView: 'aplicação',
            nameDB: 'aplicacao_valor',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'unidade',
            nameDB: 'unidade',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'valor máximo',
            nameDB: 'valor_maximo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'coin'
            }
          },
          {
            nameView: 'valor minímo',
            nameDB: 'valor_minimo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'coin'
            }
          },
      ],
      },
      {
        subTableTitle: 'cliente',
        subTableDescription: 'dados do cliente',
        ico: 'account_circle',
        buttons: [
          {
            nameView: 'identificacao',
            nameDB: 'id_individuo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'nome',
            nameDB: 'nome',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'tipo',
            nameDB: 'tipo',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
       ],
      },
      {
        subTableTitle: 'vendedor',
        subTableDescription: 'informações do vendedor',
        // ico: 'local_phone',
        ico: 'work',
        buttons: [
          {
            nameView: 'nome',
            nameDB: 'nome',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'email',
            nameDB: 'email',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
        ]
      },
      {
        subTableTitle: 'documento',
        subTableDescription: 'documentos anexados',
        // ico: 'local_phone',
        ico: 'folder',
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
            nameDB: 'tipo',
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
        ]
      }
    ]
  };

  getTablePrimary() {
    return this.columnsTablePrimary;
  }

  getTableSecundary() {
    return this.columnsTableSecundary;
  }
}
