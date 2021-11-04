export class ColumnsModel {
  // Construindo colunas
  columnsTablePrimary: Object[] =
    [
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
          dataType: 'number',
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
          dataType: 'date',
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
    ];

  columnsTableSecundary: Object = {
    subTableWidth: 'description_md',
    tables : []
  };

  getTablePrimary() {
    return this.columnsTablePrimary;
  }

  getTableSecundary() {
    return this.columnsTableSecundary;
  }

}

