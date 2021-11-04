import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogOcorrenciaComponent } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.component';
import { FormGroup, FormControl } from '@angular/forms';
import { OcorrenciaService } from 'src/app/shared/dialos/dialog/service/ocorrencia.service';
import { BoxemailComponent } from 'src/app/shared/dialos/boxemail/boxemail.component';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { BackEndFormLiberacao } from 'src/app/liberacao/liberacao/service/back-end.service';
import { EmailLiberacaoService } from 'src/app/liberacao/liberacao/service/email.service';

@Component({
  selector: 'app-rel-captacao',
  templateUrl: './rel-captacao.component.html',
  styleUrls: ['./rel-captacao.component.css'],
})

export class RelCaptacaoComponent {
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
    private menu: Menu,
    private router: Router,
    private backLiberacao: BackEndFormLiberacao,
    private dialog: MatDialog,
    private dialogRefOcorrencia: MatDialogRef<DialogOcorrenciaComponent>,
    private dialogRefBoxemail: MatDialogRef<BoxemailComponent>,
    private backEndOcorrencia: OcorrenciaService,
    private emailLiberacaoService: EmailLiberacaoService
  ) {
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
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, id_captacao]);
        break;

      case 'r':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/view`, recordInfo.id]);
        break;

      case 'ocorrencia':
        const dialogRefOcorrencia = this.dialog.open(DialogOcorrenciaComponent, {
          panelClass: 'dialog-ocorrencia-width',
        }).afterClosed().subscribe((formulario: FormGroup) => {
          formulario.setControl('id_captacao', new FormControl(id_captacao));
          this.saveOcorrencia(formulario);
        });
        break;

      case 'solicitar_di_dta':
      this.getDestinatorMail(id_captacao).then(dest => {
        this.getLiberacao(id_captacao).then((res: { items: {} }) => {
          this.email = res.items;
          this.emailLiberacaoService.getBody('soldidta', id_captacao).then((email: { body: string, subject: string }) => {
            this.dialog.open(BoxemailComponent, {
              panelClass: 'dialog-ocorrencia-width',
              data: {
                destinatario: dest,
                assunto: email.subject,
                body: email.body,
                id: id_captacao,
                modulo: 'liberacao',
                link: 'liberacao/notificacao/soldidta'
              }
            }).afterClosed().subscribe(dados => {
              if (typeof (dados) !== 'undefined' && !dados.invalidSend) {
                this.setEvento(id_captacao, 'soldidta');
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

  async getLiberacao(id_captacao: string) {
    return this.backLiberacao.getLiberacaoEmail(id_captacao);
  }

 
  async getcaptacao(id_captacao: string) {
    return this.backLiberacao.getLiberacaoEmail(id_captacao);
  }



  saveOcorrencia(formulario: FormGroup): void {
    this.backEndOcorrencia.save(formulario, 'captacao').subscribe(dados => console.log(dados));
  }

  getDestinatorMail(id_captacao: string) {
    return this.backLiberacao.getMailDestination(id_captacao);
  }

  /**
   * Metodo para setar novo evento
   * @param string id_captacao
   * @return void 
   */
  private setEvento(id_captacao: string, evento: string): void {
    const total = [];
    this.t.forEach( d => {
      if (d.id_captacao === id_captacao) {
        if (typeof (d.complementos.eventos) !== 'undefined') {
          console.log('foi')
            d.complementos.eventos.push({id_captacaoevento: "404", id_forward: null, id_captacao: id_captacao, evento: evento})
        }
      }
      total.push(d)
    })
    this.obs.next(total);
  }
}
