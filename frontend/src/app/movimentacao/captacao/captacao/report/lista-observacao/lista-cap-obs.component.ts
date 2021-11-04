import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogOcorrenciaComponent } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.component';
import { FormGroup, FormControl } from '@angular/forms';
import { OcorrenciaService } from 'src/app/shared/dialos/dialog/service/ocorrencia.service';
import { BoxemailComponent } from 'src/app/shared/dialos/boxemail/boxemail.component';
import { Captacao } from '../../model/captacao.model';
import { DatePipe } from '@angular/common';
import { Container } from '../../../../container/model/container.model';
import { BackEndFormCaptacao } from '../../service/back-end.service';

@Component({
  selector: 'app-lista-cap-obs',
  templateUrl: './lista-cap-obs.component.html',
  styleUrls: ['./lista-cap-obs.component.css'],
})

export class ListaObsCaptacaoComponent {
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
    private router: Router,
    private back: BackPropostaService,
    private backCaptacao: BackEndFormCaptacao,
    private dialog: MatDialog,
    private dialogRefOcorrencia: MatDialogRef<DialogOcorrenciaComponent>,
    private dialogRefBoxemail: MatDialogRef<BoxemailComponent>,
    private backEndOcorrencia: OcorrenciaService
  ) {
    const menu = new Menu('movimentacao', 'captacao', 'lista monitorada');
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    // Definindo captacao selecionada
    this.captacaoCurrent = recordInfo.record;
    const id_captacao = recordInfo.id;
    if ( recordInfo.title === 'Consultar' ) {
      recordInfo.event = 'r';
    }
    switch (recordInfo.event) {
      case 'crud':
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'r':     
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/view`, recordInfo.id]);
        break;

      case 'ocorrencia':
        const dialogRefOcorrencia = this.dialog.open(DialogOcorrenciaComponent, {
          panelClass: 'dialog-ocorrencia-width',
          // data: {name: this.name, animal: this.animal}
        }).afterClosed().subscribe((formulario: FormGroup) => {
          formulario.setControl('id_captacao', new FormControl(id_captacao));
          this.saveOcorrencia(formulario);
        });
        break;

      case 'alertar_parceiro':
        const destinatario = this.getDestinatorMail(id_captacao);
        const dialogRefBoxemail = this.dialog.open(BoxemailComponent, {
          panelClass: 'dialog-ocorrencia-width',
          data: {
            destinatario: destinatario,
            assunto: 'Solicitação de BL',
            body: `<h1>Cleriston</h1>`
          }
        }).afterClosed().subscribe((formulario: FormGroup) => {
          formulario.setControl('id_captacao', new FormControl(id_captacao));
          this.saveOcorrencia(formulario);
        });
        break;

      case 'solicitar_bl':
        this.getDestinatorMail(id_captacao).then(dest => {
          this.getcaptacao(id_captacao).then((res: { items: {} }) => {
            this.email = res.items[0];
            this.createBodySolicitacaoBL(this.email).then(body => {
              this.dialog.open(BoxemailComponent, {
                panelClass: 'dialog-ocorrencia-width',
                data: {
                  destinatario: destinatario,
                  assunto: 'Solicitação de BL',
                  body: body,
                  id: id_captacao,
                  modulo: 'captacao'
                }
              });
            });
          });
        });
        break;

      default:
        break;
    }
  }

  async getcaptacao(id_captacao: string) {
    return this.backCaptacao.getCaptacaoEmail(id_captacao);
  }

  createBodySolicitacaoBL(captacao: Captacao) {
    let listaCoitainer = '';
    const containeres = captacao.complementos.containeres.forEach((container: Container, i: number) => {
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
                                  Terminal de Atracação: ${captacao.complementos.terminal_atracacao[0].nome}
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
    this.backEndOcorrencia.save(formulario, 'captacao').subscribe(dados => console.log(dados));
  }

  getDestinatorMail(id_captacao: string) {
    return this.backCaptacao.getMailDestination(id_captacao);
  }
}
