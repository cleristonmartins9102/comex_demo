export interface Complemento {
  complementos: {
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
        nameView: 'ref gralsin',
        nameDB: 'ref_gralsin',
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
        nameView: 'ref importador',
        nameDB: 'ref_importador',
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
        nameView: 'importador',
        nameDB: 'importador_nome',
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
        nameView: 'bl',
        nameDB: 'bl',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-upper'
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
        nameView: 'DI/DTA',
        nameDB: 'documento',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-capitalize'
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
        nameView: 'terminal redestinação',
        nameDB: 'terminal_redestinacao',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-capitalize'
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
        nameDB: 'liberacao_status',
        config: {
          showInList: true,
          showInFilter: true,
          type: 'input',
          style: [
            'text-captalize'
          ],
          dataType: 'input',
          condition: {
            type: 'atention',
            expression: (dados, column) => {
              if (column.nameDB === 'status' && dados.status === 'Captado') {
                return true;
              }
            }
          },
          tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'contêiner',
        nameDB: 'container',
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
        nameView: 'data atracação',
        nameDB: 'dta_atracacao',
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
        nameView: 'data saída terminal',
        nameDB: 'dta_saida_terminal',
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
              const lenGFatura = dados.complementos.eventos.filter( evento => evento.evento === 'g_fatura').length;
              if (typeof(eventos) !== 'undefined' && eventos.length > 0) {
                const matChip: Array<any> = [];
                dados.complementos.eventos.forEach((evento: any) => {
                  switch (evento.evento) {
                    case 'soldidta':
                      matChip.pop();
                      matChip.push({
                        app: 'financeiro',
                        module: 'processo',
                        color: '#e77f67',
                        matTooltip: 'Solicitado DI/DTA',
                        icon: 'SD'
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
        subTableTitle: 'documento',
        subTableDescription: 'documentos',
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
    ]
  };

  getTablePrimary() {
    return this.columnsTablePrimary;
  }

  getTableSecundary() {
    return this.columnsTableSecundary;
  }

  private getChip() {
    // matChip.push({
    //   app: 'financeiro',
    //   module: 'processo',
    //   color: '#bf55ec',
    //   matTooltip: 'Gerado Processo',
    //   icon: 'GP'
    // });
  }

}

