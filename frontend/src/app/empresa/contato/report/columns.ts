export class ColumnsModel {
  // Construindo colunas
  columnsTablePrimary: Object[] =
    [
      {
        nameView: 'checkbox',
        nameDB: 'checkbox',
        nameColId: 'id_individuo',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'checkbox',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
        }
      },
      {
        nameView: 'importador',
        nameDB: 'adstrito',
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
        nameView: 'coadjuvante',
        nameDB: 'coadjuvante',
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
        nameView: 'grupo',
        nameDB: 'nome_grupo',
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
        nameView: 'criado em',
        nameDB: 'created_at',
        config: {
          showInList: true,
          showInFilter: true,
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
        nameView: 'atualizado em',
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
    tables: [
      {
        subTableTitle: 'contato',
        subTableDescription: 'contatos do grupo',
        ico: 'assignment_turned_in',
        buttons: [
          {
            nameView: 'empresa',
            nameDB: 'empresa',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'ddi',
            nameDB: 'ddi',
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
              type: 'email'
            }
          },
      ],
      },
      // {
      //   subTableTitle: 'cliente',
      //   subTableDescription: 'dados do cliente',
      //   ico: 'account_circle',
      //   buttons:[
      //     {
      //       nameView: 'identificacao',
      //       nameDB: 'id_individuo',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'nome',
      //       nameDB: 'nome',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'tipo',
      //       nameDB: 'tipo',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'contato',
      //       nameDB: 'contato',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input'
      //       }
      //     },
      //  ],
      // },
      // {
      //   subTableTitle: 'vendedor',
      //   subTableDescription: 'informações do vendedor',
      //   // ico: 'local_phone',
      //   ico: 'work',
      //   buttons: [
      //     {
      //       nameView: 'nome',
      //       nameDB: 'nome',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'email',
      //       nameDB: 'email',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input'
      //       }
      //     },
      //   ]
      // },
      // {
      //   subTableTitle: 'documento',
      //   subTableDescription: 'documentos anexados',
      //   // ico: 'local_phone',
      //   ico: 'folder',
      //   buttons: [
      //     {
      //       nameView: 'nome documento',
      //       nameDB: 'nome_original',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'tipo',
      //       nameDB: 'tipo',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input'
      //       }
      //     },
      //     {
      //       nameView: 'criado em',
      //       nameDB: 'created_at',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'input',
      //         dataType: 'datetime'
      //       }
      //     },
      //     {
      //       nameView: '',
      //       nameDB: 'token',
      //       config: {
      //         showInList:true,
      //         showInFilter:false,
      //         type: 'ico',
      //         icoName: 'cloud_download'
      //       }
      //     },
      //   ]
      // }
    ]
  };

  getTablePrimary() {
    return this.columnsTablePrimary;
  }

  getTableSecundary() {
    return this.columnsTableSecundary;
  }

}

