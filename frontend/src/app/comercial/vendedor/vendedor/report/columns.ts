export class ColumnsModel {
  // Construindo colunas
  columnsTablePrimary: Object[] =
    [
      {
        nameView: 'checkbox',
        nameDB: 'checkbox',
        nameColId: 'id_proposta',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'checkbox',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          },
          tooltip: 'Carga captada, solicitar a documentação.'
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
    tables: [
      // {
      //   subTableTitle: 'items',
      //   subTableDescription: 'itens do pacote',
      //   ico: 'assignment_turned_in',
      //   buttons: [
      //     {
      //       nameView: 'nome',
      //       nameDB: 'nome',
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

