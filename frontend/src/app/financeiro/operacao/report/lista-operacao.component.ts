import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogOcorrenciaComponent } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.component';
import { FormGroup, FormControl } from '@angular/forms';
import { OcorrenciaService } from 'src/app/shared/dialos/dialog/service/ocorrencia.service';
import { BoxemailComponent } from 'src/app/shared/dialos/boxemail/boxemail.component';
import { DatePipe } from '@angular/common';
import { BackEndFormLiberacao } from 'src/app/liberacao/liberacao/service/back-end.service';
import { SaveResponse } from 'src/app/shared/model/save-response.model';
import { BackEndProcesso } from '../../processo/service/back-end.service';
import { BackendService } from 'src/app/shared/service/backend.service';
import { Regime } from 'src/app/shared/model/regime.model';

@Component({
  selector: 'app-lista-operacao',
  templateUrl: './lista-operacao.component.html',
  styleUrls: ['./lista-operacao.component.css'],
})

export class ListaOperacaoComponent {
  email: any;
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  @ViewChild('bodySolicitarBl') bodySolicitarBl: ElementRef;

  ocorrenciaFormulario: FormGroup;
  captacaoCurrent: {};

  constructor(
    private col: ColumnsModel,
    private backendGeral: BackendService,
    private snackBar: MatSnackBar,
    private router: Router,
    private backProcesso: BackEndProcesso,
    private backEndOcorrencia: OcorrenciaService
  ) {
    const menu = new Menu('financeiro', 'operacao', 'operações');
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    const id_regime = recordInfo.record.id_regime;
    let regime = null;
    if (typeof (recordInfo.record.validate) !== 'undefined' && !recordInfo.record.validate.valid) {
      this.openSnackBar(recordInfo.record.validate.value, '');
      return;
    }
    this.backendGeral.getRegimeById(id_regime).subscribe((reg: Regime) => {
      regime = reg.regime;
      let id_operacao = null;
      if (regime === 'importacao') {
        id_operacao = recordInfo.record.id_operacao;
      } else {
        id_operacao = recordInfo.record.id_despacho;
      }
      // Definindo captacao selecionada
      this.captacaoCurrent = recordInfo.record;
      switch (recordInfo.event) {
        case 'gerar_processo':
          const eventos = recordInfo.record.complementos.eventos;
          const instructions = {
            app: 'operacao',
            id: id_operacao,
            regime: regime,
            lote: recordInfo.record.id_captacaolote ? true : false
          };
          this.backProcesso.generate(instructions).subscribe((response: SaveResponse) => {
            if (response.status === 'success') {
              eventos.push({
                evento: 'g_processo',
                id_forward: (<any>response).id_processo,
                id_captacao: eventos.id_captacao,
                id_captacaoevento: '26'
              });
            }
          });
          break;

        default:
          break;
      }
    });
  }

  async getcaptacao(id_captacao: string) {
    // return this.backCaptacao.getCaptacaoEmail(id_captacao);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  createBodySolicitacaoBL(captacao: any) {
    let listaCoitainer = '';
    const containeres = captacao.complementos.containeres.forEach((container: any, i: number) => {
      listaCoitainer += `<tr>`;
      listaCoitainer += `<td style='font-family: Arial, sans-serif; font-size: 12px;padding-left:5px;'>` + container.codigo + '</td>';
      listaCoitainer += `<td style='font-family: Arial, sans-serif; font-size: 12px;padding-left:5px;'>` + container.dimensao + '</td>';
      listaCoitainer += `</tr>`;
    });
    const datePipe = new DatePipe('pt');
    captacao.dta_prevista_atracacao = datePipe.transform(captacao.dta_prevista_atracacao, 'dd/MM/yyyy');
    return new Promise((resolve, reject) => {
      const body = `<table border='0' cellpadding='0' cellspacing='0' width='100%' style='margin:40px 0'>
                    <tr>
                      <td>
                        <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border: 1px solid #cccccc;'>
                          <tr>
                            <td bgcolor='#dfe6e9' style='padding:10px;border-bottom: 1px solid #cccccc;'>
                                <p style='font-family: Arial, sans-serif; font-size: 12px;'>Prezado(as),</p>
                                <p style='font-family: Arial, sans-serif; font-size: 12px;margin-bottom:0'>Identificamos os processos mencionados abaixo que tem previsão de atracação no dia ${captacao.dta_prevista_atracacao}</p>
                            </td>
                          </tr>
                        <tr>
                          <td style='padding:30px 30px 0 30px'>
                            <table style='width:100%;'>
                              <tr>
                                <td style='font-family: Arial, sans-serif; font-size: 12px;'>
                                  BL: ${captacao.bl}
                                </td>
                              </tr>
                              <tr>
                                <td style='font-family: Arial, sans-serif; font-size: 12px;'>
                                  Terminal de Atracação: ${captacao.complementos.terminal[0].nome}
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

  saveOcorrencia(formulario: FormGroup): void {
    this.backEndOcorrencia.save(formulario, 'liberacao').subscribe(dados => console.log(dados));
  }

  getDestinatorMail(id_captacao: string) {
    // return this.backCaptacao.getMailDestination(id_captacao);
  }
}
