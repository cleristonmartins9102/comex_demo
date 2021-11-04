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
import { BackEndFatura } from '../../service/back-end.service';
import { environment } from 'src/environments/environment.dev';
import { BackEndFormCaptacao } from 'src/app/movimentacao/captacao/captacao/service/back-end.service';
import { EmailFaturaService } from '../../service/email.service';
// import { BackEndProcesso } from '../service/back-end.service';

@Component({
  selector: 'app-rel-fatura-simples',
  templateUrl: './lista-fatura.component.html',
  styleUrls: ['./lista-fatura.component.css'],
})

export class RelFaturaSimplesComponent {
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
    private menu: Menu,
    private router: Router,
    private snackBar: MatSnackBar,
    private backEndFatura: BackEndFatura,
    // private backProcesso: BackEndProcesso,
    private dialog: MatDialog,
    private dialogRefOcorrencia: MatDialogRef<DialogOcorrenciaComponent>,
    private dialogRefBoxemail: MatDialogRef<BoxemailComponent>,
    private backEndOcorrencia: OcorrenciaService,
    private backCaptacao: BackEndFormCaptacao,
    private emailFaturaService: EmailFaturaService
  ) {
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    // Definindo captacao selecionada
    this.captacaoCurrent = recordInfo.record;
    const id_fatura = recordInfo.id;
    switch (recordInfo.event) {
      case 'imprimir_fatura'://
        const address = environment.baseUrl
          // const url = `http://127.0.0.1:4200/#/print/fatura/` + id_fatura
          // const url = `http://app-gralsin.ddns.net/arm/#/print/fatura/` + id_fatura;
          const url = `http://giag-homo.gralsin.com.br/arm/#/print/fatura/` + id_fatura;

        window.open(url, '_blank');

        // const eventos = recordInfo.record.complementos.eventos;
        // this.backProcesso.generate(id_processo).subscribe((response: SaveResponse) => {
          // if (response.status === 'success') {
          //   // eventos.push({
          //   //   evento: 'g_liberacao',
          //   //   id_captacao: eventos.id_captacao,
          //   //   id_captacaoevento: '26'
          //   // });
          // }
        // });
        break;

      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'r':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/view`, recordInfo.id]);
        break;
      
      case 'enviar_fatura':
        this.getDestinatorMail(id_fatura).then(dest => {
          this.email = dest[0];
          this.emailFaturaService.getBody('envfat', id_fatura).then((email: { body: string, subject: string }) => {
            this.dialog.open(BoxemailComponent, {
              panelClass: 'dialog-ocorrencia-width',
              data: {
                destinatario: dest,
                assunto: email.subject,
                body: email.body,
                id: id_fatura,
                modulo: 'fatura',
                link: 'fatura/notificacao/enviofatura'
              }
            }).afterClosed().subscribe(dados => {
              if (!dados.invalidSend) {
                // this.setEvento(id_fatura, 'solicitado_bl');
              }
            });
          });
          // this.getfatura(id_fatura).then((res: { items: {} }) => {
          //   this.email = res.items[0];
          //   // this.emailCaptacaoService.getBody('solbl', id_fatura).then((email: { body: string, subject: string }) => {
          //   //   this.dialog.open(BoxemailComponent, {
          //   //     panelClass: 'dialog-ocorrencia-width',
          //   //     data: {
          //   //       destinatario: dest,
          //   //       assunto: email.subject,
          //   //       body: email.body,
          //   //       id: id_fatura,
          //   //       modulo: 'captacao',
          //   //       link: 'captacao/notificacao/solicitarbl'
          //   //     }
          //   //   }).afterClosed().subscribe(dados => {
          //   //     if (!dados.invalidSend) {
          //   //       // this.setEvento(id_fatura, 'solicitado_bl');
          //   //     }
          //   //   });
          //   // });
          // });
        });
        break;

      case 'recalcular':
        this.backEndFatura.recalcular(recordInfo.id);
        break;
      
      case 'gerar_complementar':
        this.backEndFatura.gerarComplementar(recordInfo.id).subscribe((dados: any) => {
          if (dados.status) {
            this.openSnackBar('Gerando complementar', '', dados);
          } else {
            this.snackBar.open(dados.message, '', {
              duration: 2000
            })
          }
        });
        break;

      default:
        break;
    }
  }

  openSnackBar(message: string, action: string, fatura: {id}) {
    this.snackBar.open(message, action, {
      duration: 2000
    }).afterDismissed().subscribe(() => {
      this.router.navigate(['/financeiro/fatura/editar', fatura.id]);
    });
  }

  async getfatura(id_captacao: string) {
    // return this.backEndFatura.getFaturaById(1)
  }

  saveOcorrencia(formulario: FormGroup): void {
    this.backEndOcorrencia.save(formulario, 'liberacao').subscribe(dados => console.log(dados));
  }

  getDestinatorMail(id_fatura: string) {
    return this.backEndFatura.getMailDestination(id_fatura);
  }

}
