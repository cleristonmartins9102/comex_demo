import { Captacao } from '../model/captacao.model';
import { DatePipe } from '@angular/common';
import { Container } from '../../../container/model/container.model';

export function createBodySolicitacaoBL(movimentacao: any) {
        let listaCoitainer = '';
        const containeres = movimentacao.complementos.containeres.forEach((container: Container, i: number) => {
          listaCoitainer += `<tr>`;
          listaCoitainer += `<td style='font-family: Arial, sans-serif; font-size: 12px;padding-left:5px;'>` + container.codigo + '</td>';
          listaCoitainer += `<td style='font-family: Arial, sans-serif; font-size: 12px;padding-left:5px;'>` + container.dimensao + '</td>';
          listaCoitainer += `</tr>`;
        });
        
        const datePipe = new DatePipe('pt');
        movimentacao.dta_prevista_atracacao = datePipe.transform(movimentacao.dta_prevista_atracacao, 'dd/MM/yyyy');
        return new Promise((resolve, reject) => {
          const body = `<table border='0' cellpadding='0' cellspacing='0' width='100%' style='margin:40px 0'>
                        <tr>
                          <td>
                            <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border: 1px solid #cccccc;'>
                              <tr>
                                <td bgcolor='#dfe6e9' style='padding:10px;border-bottom: 1px solid #cccccc;'>
                                    <p style='font-family: Arial, sans-serif; font-size: 12px;'>Prezado(as),</p>
                                    <p style='font-family: Arial, sans-serif; font-size: 12px;margin-bottom:0'>Identificamos os processos mencionados abaixo que tem previsão de atracação no dia ${movimentacao.dta_prevista_atracacao}</p>
                                </td>
                              </tr>
                            <tr>
                              <td style='padding:30px 30px 0 30px'>
                                <table style='width:100%;'>
                                  <tr>
                                    <td style='font-family: Arial, sans-serif; font-size: 12px;'>
                                      BL: ${movimentacao.bl}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style='font-family: Arial, sans-serif; font-size: 12px;'>
                                      Terminal de Atracação: ${movimentacao.complementos.terminal_atracacao[0]}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style='padding:10px 30px 30px 30px'>
                                <table style='width:100%;border: 1px solid #cccccc;border-collapse: collapse;
                                '>
                                  <tr style='background: #3b5998'>
                                    <td style='color: #eee; font-family: Arial, sans-serif; font-size: 12px;padding-left:5px;'>
                                      Contêineres
                                    </td>
                                    <td style='color: #eee; font-family: Arial, sans-serif; font-size: 12px;padding-left:5px;'>
                                      Dimensão
                                    </td>
                                  </tr>
                                    ${listaCoitainer}
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td bgcolor='#dfe6e9' style='padding:10px;border-top: 1px solid #cccccc;'>
                                <p style='font-family: Arial, sans-serif; font-size: 12px;'>Por gentileza, encaminhar BL e CE Master para que possamos seguir com o cadastro junto ao terminal.<p>
                                <p style='font-family: Arial, sans-serif; font-size: 12px;'>Nos mantemos a disposição.</p>
                                <p style='font-family: Arial, sans-serif; font-size: 12px;margin-bottom:0'>Atenciosamente,</p>
                              </td>
                            </tr>
                          </table>
                          </td>
                        </tr>
                      </table>`;
          resolve(body);
        });
      }
