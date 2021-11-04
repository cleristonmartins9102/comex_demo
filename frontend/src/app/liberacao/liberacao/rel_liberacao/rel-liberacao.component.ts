import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogOcorrenciaComponent } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.component';
import { FormGroup, FormControl } from '@angular/forms';
import { OcorrenciaService } from 'src/app/shared/dialos/dialog/service/ocorrencia.service';
import { BoxemailComponent } from 'src/app/shared/dialos/boxemail/boxemail.component';
import { BackEndFormLiberacao } from '../service/back-end.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { EmailLiberacaoService } from '../service/email.service';

@Component({
  selector: 'app-rel-liberacao',
  templateUrl: './rel-liberacao.component.html',
  styleUrls: ['./rel-liberacao.component.css'],
})

export class RelLiberacaoComponent {
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
    const id_liberacao = recordInfo.id;

    switch (recordInfo.event) {
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, id_liberacao]);
        break;

      case 'r':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/view`, recordInfo.id]);
        break;

      case 'ocorrencia':
        const dialogRefOcorrencia = this.dialog.open(DialogOcorrenciaComponent, {
          panelClass: 'dialog-ocorrencia-width',
        }).afterClosed().subscribe((formulario: FormGroup) => {
          formulario.setControl('id_liberacao', new FormControl(id_liberacao));
          this.saveOcorrencia(formulario);
        });
        break;

      case 'solicitar_di_dta':
      this.getDestinatorMail(id_liberacao).then(dest => {
        this.getLiberacao(id_liberacao).then((res: { items: {} }) => {
          this.email = res.items;
          this.emailLiberacaoService.getBody('soldidta', id_liberacao).then((email: { body: string, subject: string }) => {
            this.dialog.open(BoxemailComponent, {
              panelClass: 'dialog-ocorrencia-width',
              data: {
                destinatario: dest,
                assunto: email.subject,
                body: email.body,
                id: id_liberacao,
                modulo: 'liberacao',
                link: 'liberacao/notificacao/soldidta'
              }
            }).afterClosed().subscribe(dados => {
              if (typeof (dados) !== 'undefined' && !dados.invalidSend) {
                this.setEvento(id_liberacao, 'soldidta');
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

  async getLiberacao(id_liberacao: string) {
    return this.backLiberacao.getLiberacaoEmail(id_liberacao);
  }

 
  async getcaptacao(id_liberacao: string) {
    return this.backLiberacao.getLiberacaoEmail(id_liberacao);
  }



  saveOcorrencia(formulario: FormGroup): void {
    this.backEndOcorrencia.save(formulario, 'liberacao').subscribe(dados => console.log(dados));
  }

  getDestinatorMail(id_liberacao: string) {
    return this.backLiberacao.getMailDestination(id_liberacao);
  }

  /**
   * Metodo para setar novo evento
   * @param string id_liberacao
   * @return void 
   */
  private setEvento(id_liberacao: string, evento: string): void {
    const total = [];
    this.t.forEach( d => {
      if (d.id_liberacao === id_liberacao) {
        if (typeof (d.complementos.eventos) !== 'undefined') {
          console.log('foi')
            d.complementos.eventos.push({id_liberacaoevento: "404", id_forward: null, id_liberacao: id_liberacao, evento: evento})
        }
      }
      total.push(d)
    })
    this.obs.next(total);
  }
}
