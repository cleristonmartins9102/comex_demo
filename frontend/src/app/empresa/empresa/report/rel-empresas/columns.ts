export class ColumnsModel {
  // Construindo colunas
  columnsTablePrimary: Object[] =
    [
      // {
      //   nameView: 'checkbox',
      //   nameDB: 'checkbox',
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
        nameView: 'identificador',
        nameDB: 'identificador',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
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
        nameView: 'nome',
        nameDB: 'nome',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
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
        nameView: 'tipo',
        nameDB: 'tipo',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
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
        nameView: 'cidade',
        nameDB: 'cidade',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
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
        nameView: 'estado',
        nameDB: 'estado',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
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
        nameView: 'data cadastro',
        nameDB: 'created_at',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'datetime',
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
        nameView: 'data modifcado',
        nameDB: 'updated_at',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'date',
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
        nameView: 'criado por',
        nameDB: 'created_by',
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
        nameView: 'atualizado por',
        nameDB: 'updated_by',
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
        subTableTitle: 'papel',
        subTableDescription: 'papeis da empresa',
        ico: 'home',
        buttons: [
          {
            nameView: 'papel',
            nameDB: 'nome',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
       ],
      },
      {
        subTableTitle: 'endereco',
        subTableDescription: 'endereco da empresa',
        ico: 'home',
        buttons: [
          {
            nameView: 'logradouro',
            nameDB: 'logradouro',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'numero',
            nameDB: 'numero',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'cep',
            nameDB: 'cep',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'bairro',
            nameDB: 'bairro',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'cidade',
            nameDB: 'cidade',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'estado',
            nameDB: 'estado',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
       ],
      },
      {
        subTableTitle: 'contato',
        subTableDescription: 'contato(s) da empresa',
        ico: 'local_phone',
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
            nameView: 'ddd',
            nameDB: 'ddd',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
            }
          },
          {
            nameView: 'telefone',
            nameDB: 'telefone',
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
          {
            nameView: 'classificacao',
            nameDB: 'classificacao',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input'
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

