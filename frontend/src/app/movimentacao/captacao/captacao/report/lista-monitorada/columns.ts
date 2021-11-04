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
        nameDB: 'numero',
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
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      {
        nameView: 'proposta',
        nameDB: 'proposta',
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
          },
          // tooltip: 'Carga captada, solicitar a documentação.'
        }
      },
      // {
      //   nameView: 'proposta',
      //   nameDB: 'proposta',
      //   config: {
      //     showInList: true,
      //     showInFilter: false,
      //     type: 'input',
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
        nameView: 'importador',
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
        nameView: 'status',
        nameDB: 'status',
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
              if (column.nameDB === 'status' && dados.status === 'atracado') {
                return true;
              }
            }
          },
          tooltip: 'Carga atracada, solicitar a documentação.'
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
          dataType: 'input',
          condition: {
            expression: (dados, column) => {
              return false;
            }
          }
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
        nameView: 'navio',
        nameDB: 'nome_navio',
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
        nameView: 'lote',
        nameDB: 'lote',
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
        nameView: 'data prevista atracação',
        nameDB: 'dta_prevista_atracacao',
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
          }
        }
      },
      {
        nameView: 'data atracação',
        nameDB: 'dta_atracacao',
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
            expression: (dados: Complemento, column: any) => {
              const eventos = dados.complementos.eventos;
              if (typeof(eventos) !== 'undefined' && eventos.length > 0) {
                const matChip: Array<any> = [];
                let lenSolBl = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'solicitado_bl').length; 
                let lenSolCE = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'solicitado_ce').length; 
                let lenConfRecBl = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'confrecbl').length; 
                let lenConfCliente = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'confcliente').length; 
                let lenAltDtaAtracacao = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'altdtaatracacao').length; 
                let lenConfAtracacao = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'confatracacao').length; 
                let lenPresCarga = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'presencacarga').length; 
                let lenProcesso = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'g_processo').length; 
                let lenLiberacao = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'g_liberacao').length; 
                let lenFatura = dados.complementos.eventos.filter( ( evento: any ) => evento.evento === 'g_fatura').length; 
                if (lenSolBl > 0) {
                  matChip.push({
                    app: 'captacao',
                    module: 'movimentacao',
                    color: '#f22613',
                    matTooltip: `Solicitado BL: ${lenSolBl} ${lenSolBl > 1 ? 'vezes' : 'vez'}`,
                    icon: 'SBL'
                  });
                }
                if (lenSolCE > 0) {
                  matChip.push({
                    app: 'captacao',
                    module: 'movimentacao',
                    color: '#D6A2E8',
                    matTooltip: 'Solicitado CE Master',
                    icon: 'SCE'
                  });
                }
                if (lenConfRecBl > 0) {
                  matChip.push({
                    app: 'captacao',
                    module: 'movimentacao',
                    color: '#FC427B',
                    matTooltip: 'Confirmado Recebimento de BL',
                    icon: 'CRBL'
                  });
                }
                if (lenConfCliente > 0) {
                  matChip.push({
                    app: 'captacao',
                    module: 'movimentacao',
                    color: '#BDC581',
                    matTooltip: 'Informado solicitação de cadastro no terminal',
                    icon: 'ISCT'
                  });
                }
                if (lenAltDtaAtracacao > 0) {
                  matChip.push({
                    app: 'captacao',
                    module: 'movimentacao',
                    color: '#F8EFBA',
                    matTooltip: 'Alterado Data de Atracação',
                    icon: 'ADA'
                  });
                }
                if (lenConfAtracacao > 0) {
                  matChip.push({
                    app: 'captacao',
                    module: 'movimentacao',
                    color: '#d1d8e0',
                    matTooltip: 'Confirmado Atracação',
                    icon: 'CA'
                  });
                }
                if (lenPresCarga > 0) {
                  matChip.push({
                    app: 'captacao',
                    module: 'movimentacao',
                    color: '#f3a683',
                    matTooltip: 'Informado Presença de Carga',
                    icon: 'PC'
                  });
                }
                if (lenLiberacao > 0) {
                  matChip.push({
                    app: 'liberacao',
                    module: 'liberacao',
                    color: '#ff9f43',
                    matTooltip: 'Gerado Liberação',
                    icon: 'GL'
                  });
                }
                if (lenProcesso > 0) {
                  matChip.push({
                    app: 'financeiro',
                    module: 'processo',
                    color: '#bf55ec',
                    matTooltip: 'Gerado Processo',
                    icon: 'GP'
                  });
                }
                if (lenFatura > 0) {
                  matChip.push({
                    app: 'financeiro',
                    module: 'fatura',
                    color: '#6495ED',
                    matTooltip: 'Gerado Fatura',
                    icon: 'GF'
                  });
                }

                dados.complementos.eventos.forEach((evento: any) => {
                  switch (evento.evento) {
                    case 'solicitado_bl':
                      // matChip.pop();
                     
                      break;

                    case 'solicitado_ce':
                      // matChip.pop();
                    
                      break;

                    case 'confrecbl':
                      // matChip.pop();
                    
                      break;

                    case 'confcliente':
                      // matChip.pop();
                    
                      break;

                    case 'altdtaatracacao':
                      // matChip.pop();
                     
                      break;

                    case 'confatracacao':
                      // matChip.pop();
                      
                      break;

                    case 'presencacarga':
                      // matChip.pop();
                     
                      break;

                    case 'g_liberacao':
                      // matChip.pop();
                     
                      break;

                    case 'g_processo':
                      matChip.pop();
                     
                      break;

                    case 'g_fatura':
                      matChip.pop();
                     
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
        subTableTitle: 'proposta',
        subTableDescription: 'informações da proposta',
        ico: 'assignment_turned_in',
        buttons: [
          {
            nameView: 'número',
            nameDB: 'numero',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'cliente',
            nameDB: 'cliente',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          {
            nameView: 'coadjuvante',
            nameDB: 'coadjuvante',
            config: {
              showInList: true,
              showInFilter: false,
              type: 'input',
              dataType: 'input'
            }
          },
          // {
          //   nameView: 'contato',
          //   nameDB: 'grupodecontato',
          //   config: {
          //     showInList: true,
          //     showInFilter: false,
          //     type: 'input',
          //     dataType: 'input'
          //   }
          // },
          {
            nameView: 'status',
            nameDB: 'status',
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
        subTableTitle: 'container',
        subTableDescription: 'containeres',
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
      {
        subTableTitle: 'documentos',
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
    ]
  };

  getTablePrimary() {
    return this.columnsTablePrimary;
  }

  getTableSecundary() {
    return this.columnsTableSecundary;
  }

}

