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
import { BackEndFormLiberacao } from 'src/app/liberacao/liberacao/service/back-end.service';
import { BackEndFormCaptacao } from '../../service/back-end.service';
import { SaveResponse } from 'src/app/shared/model/save-response.model';
import { createBodySolicitacaoBL } from '../body-email';
import { EmailCaptacaoService } from '../../service/email.service';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lista-cap-mon',
  templateUrl: './lista-cap-mon.component.html',
  styleUrls: ['./lista-cap-mon.component.css'],
})

export class ListaMonCaptacaoComponent {
  email: any;
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  @ViewChild('bodySolicitarBl') bodySolicitarBl: ElementRef;

  ocorrenciaFormulario: FormGroup;
  captacaoCurrent: {};
  obs: Subject<any>;
  t: any;
  constructor(
    private col: ColumnsModel,
    private router: Router,
    private back: BackPropostaService,
    private backCaptacao: BackEndFormCaptacao,
    private backLiberacao: BackEndFormLiberacao,
    private dialog: MatDialog,
    private dialogRefOcorrencia: MatDialogRef<DialogOcorrenciaComponent>,
    private dialogRefBoxemail: MatDialogRef<BoxemailComponent>,
    private backEndOcorrencia: OcorrenciaService,
    private emailCaptacaoService: EmailCaptacaoService
  ) {
    const menu = new Menu('movimentacao', 'captacao', 'lista monitorada');
    this.data.menu = menu.getWindowMenu();
  }

  listeningDataApi(observable: Subject<any>) {
    const dados = observable;
    this.obs = observable;
    this.obs.subscribe( d => {
      this.t = d;
    })
  }


  menuResponse(recordInfo) {
    // Definindo captacao selecionada
    this.captacaoCurrent = recordInfo.record;
    const id_captacao = recordInfo.id;

    switch (recordInfo.event) {
      case 'crud':
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'r':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/view`, recordInfo.id]);
        break;

      case 'gerar_liberacao':
        const eventos = recordInfo.record.complementos.eventos;
        this.backLiberacao.generate(id_captacao).subscribe((response: SaveResponse) => {
          if (response.status === 'success') {
            eventos.push({
              evento: 'g_liberacao',
              id_forward: (<any>response).id_liberacao,
              // id_captacao: eventos.id_captacao,
              // id_captacaoevento: '26'
            });
            // console.log(eventos);
          }
        });
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
            body: `<h1>Cleriston</h1>`,
            allowEditText: true
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
            this.emailCaptacaoService.getBody('solbl', id_captacao).then((email: { body: string, subject: string }) => {
              this.dialog.open(BoxemailComponent, {
                panelClass: 'dialog-ocorrencia-width',
                data: {
                  destinatario: dest,
                  assunto: email.subject,
                  body: email.body,
                  allowEditText: true,
                  id: id_captacao,
                  modulo: 'captacao',
                  link: 'captacao/notificacao/solicitarbl'
                }
              }).afterClosed().subscribe(dados => {
                if (!dados.invalidSend) {
                  this.setEvento(id_captacao, 'solicitado_bl');
                }
              });
            });
          });
        });
        break;

      case 'solicitar_ce':
        this.getDestinatorMail(id_captacao).then(dest => {
          this.getcaptacao(id_captacao).then((res: { items: {} }) => {
            this.email = res.items[0];
            this.emailCaptacaoService.getBody('solce', id_captacao).then((email: { body: string, subject: string }) => {
              this.dialog.open(BoxemailComponent, {
                panelClass: 'dialog-ocorrencia-width',
                data: {
                  destinatario: dest,
                  assunto: email.subject,
                  body: email.body,
                  id: id_captacao,
                  allowEditText: true,
                  modulo: 'captacao',
                  link: 'captacao/notificacao/solicitarce'
                }
              }).afterClosed().subscribe(dados => {
                if (!dados.invalidSend) {
                  this.setEvento(id_captacao, 'solicitado_ce');
                }
              });
            });
          });
        });
        break;

      case 'confrecbl':
        this.getDestinatorMail(id_captacao).then(dest => {
          this.getcaptacao(id_captacao).then((res: { items: {} }) => {
            this.email = res.items[0];
            this.emailCaptacaoService.getBody('confrecbl', id_captacao).then((email: { body: string, subject: string }) => {
              this.dialog.open(BoxemailComponent, {
                panelClass: 'dialog-ocorrencia-width',
                data: {
                  destinatario: dest,
                  assunto: email.subject,
                  body: email.body,
                  id: id_captacao,
                  allowEditText: true,
                  modulo: 'captacao',
                  link: 'captacao/notificacao/confrecbl'
                }
              }).afterClosed().subscribe(dados => {
                if (!dados.invalidSend) {
                  this.setEvento(id_captacao, 'confrecbl');
                }
              });
            });
          });
        });
        break;

      case 'confcliente':
        this.getDestinatorMail(id_captacao).then(dest => {
          this.getcaptacao(id_captacao).then((res: { items: {} }) => {
            this.email = res.items[0];
            this.emailCaptacaoService.getBody('confcliente', id_captacao).then((email: { body: string, subject: string }) => {
              this.dialog.open(BoxemailComponent, {
                panelClass: 'dialog-ocorrencia-width',
                data: {
                  destinatario: dest,
                  assunto: email.subject,
                  body: email.body,
                  id: id_captacao,
                  allowEditText: true,
                  modulo: 'captacao',
                  link: 'captacao/notificacao/confcliente'
                }
              }).afterClosed().subscribe(dados => {
                if (!dados.invalidSend) {
                  this.setEvento(id_captacao, 'confcliente');
                }
              });
            });
          });
        });
        break;

      case 'altdtaatracacao':
        this.getDestinatorMail(id_captacao).then(dest => {
          this.getcaptacao(id_captacao).then((res: { items: {} }) => {
            this.email = res.items[0];
            this.emailCaptacaoService.getBody('altdtaatracacao', id_captacao).then((email: { body: string, subject: string }) => {
              this.dialog.open(BoxemailComponent, {
                panelClass: 'dialog-ocorrencia-width',
                data: {
                  destinatario: dest,
                  assunto: email.subject,
                  body: email.body,
                  id: id_captacao,
                  allowEditText: true,
                  modulo: 'captacao',
                  link: 'captacao/notificacao/altdtaatracacao'
                }
              }).afterClosed().subscribe(dados => {
                if (!dados.invalidSend) {
                  this.setEvento(id_captacao, 'altdtaatracacao');
                }
              });
            });
          });
        });
        break

      case 'confatracacao':
        this.getDestinatorMail(id_captacao).then(dest => {
          this.getcaptacao(id_captacao).then((res: { items: {} }) => {
            this.email = res.items[0];
            this.emailCaptacaoService.getBody('confatracacao', id_captacao).then((email: { body: string, subject: string, ocorrencias: string[] }) => {
              this.dialog.open(BoxemailComponent, {
                panelClass: 'dialog-ocorrencia-width',
                data: {
                  destinatario: dest,
                  assunto: email.subject,
                  body: email.body,
                  id: id_captacao,
                  allowEditText: true,
                  modulo: 'captacao',
                  link: 'captacao/notificacao/confatracacao',
                  ocorrencias: email.ocorrencias
                }
              }).afterClosed().subscribe(dados => {
                if (!dados.invalidSend) {
                  this.setEvento(id_captacao, 'confatracacao');
                }
              });
            });
          });
        });
        break;

      case 'presencacarga':
        this.getDestinatorMail(id_captacao).then(dest => {
          this.getcaptacao(id_captacao).then((res: { items: {} }) => {
            this.email = res.items[0];
            this.emailCaptacaoService.getBody('presencacarga', id_captacao).then((email: { body: string, subject: string }) => {
              this.dialog.open(BoxemailComponent, {
                panelClass: 'dialog-ocorrencia-width',
                data: {
                  destinatario: dest,
                  assunto: email.subject,
                  body: email.body,
                  id: id_captacao,
                  allowEditText: true,
                  modulo: 'captacao',
                  link: 'captacao/notificacao/presencacarga'
                }
              }).afterClosed().subscribe(dados => {
                if (!dados.invalidSend) {
                  this.setEvento(id_captacao, 'presencacarga');
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



  saveOcorrencia(formulario: FormGroup): void {
    this.backEndOcorrencia.save(formulario, 'captacao').subscribe(dados => console.log(dados));
  }

  getDestinatorMail(id_captacao: string) {
    return this.backCaptacao.getMailDestination(id_captacao);
  }


  /**
   * Metodo para setar novo evento
   * @param string id_captacao
   * @return void 
   */
  private setEvento(id_captacao: string, evento: string): void {
    const total = [];
    this.t.forEach( d => {
      if (d.numero === id_captacao) {
        if (typeof (d.complementos.eventos) !== 'undefined') {
            d.complementos.eventos.push({id_captacaoevento: "404", id_forward: null, id_captacao: "3809", evento: evento})
        }
      }
      total.push(d)
    })
    this.obs.next(total);
  }
}
