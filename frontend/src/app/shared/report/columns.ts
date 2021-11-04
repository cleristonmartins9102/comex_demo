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
      //     type: 'checkbox'
      //   }
      // },
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
        nameView: 'Data Cadastro',
        nameDB: 'created_at',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'input'
        }
      },
      {
        nameView: 'Data Atualizado',
        nameDB: 'updated_at',
        config: {
          showInList: true,
          showInFilter: false,
          type: 'input'
        }
      },
    ];

  columnsTableSecundary: Object[] = [
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
      nameView: 'descricao',
      nameDB: 'descricao',
      config: {
        showInList: true,
        showInFilter: false,
        type: 'input'
      }
    }
  ];

  getTablePrimary() {
    return this.columnsTablePrimary;
  }

  getTableSecundary() {
    return this.columnsTableSecundary;
  }
}

