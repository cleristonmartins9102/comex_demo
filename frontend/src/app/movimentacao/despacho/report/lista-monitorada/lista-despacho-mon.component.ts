import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ColumnsModel } from './columns';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogOcorrenciaComponent } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.component';
import { FormGroup, FormControl } from '@angular/forms';
import { OcorrenciaService } from 'src/app/shared/dialos/dialog/service/ocorrencia.service';
import { BoxemailComponent } from 'src/app/shared/dialos/boxemail/boxemail.component';
import { BackEndFormLiberacao } from 'src/app/liberacao/liberacao/service/back-end.service';
import { BackEndFormDespacho } from '../../service/back-end.service';
import { SaveResponse } from 'src/app/shared/model/save-response.model';
import { Menu } from './menu-permission';
import { BackEndProcesso } from 'src/app/financeiro/processo/service/back-end.service';

@Component({
  selector: 'app-lista-despacho-mon',
  templateUrl: './lista-despacho-mon.component.html',
  styleUrls: ['./lista-despacho-mon.component.css'],
})

export class ListaMonDespachoComponent {
  email: any;
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  @ViewChild('bodySolicitarBl') bodySolicitarBl: ElementRef;

  ocorrenciaFormulario: FormGroup;
  despachoCurrent: {};

  constructor(
    private col: ColumnsModel,
    private router: Router,
    private backProcesso: BackEndProcesso,
    private dialog: MatDialog,
    private backEndOcorrencia: OcorrenciaService
  ) {
    const menu = new Menu('movimentacao', 'despacho', 'lista de despachos');
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    // Definindo captacao selecionada
    this.despachoCurrent = recordInfo.record;
    const id_despacho = recordInfo.id;

    switch (recordInfo.event) {
      case 'crud':
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'r':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/view`, recordInfo.id]);
        break;

      case 'gerar_processo':
        const eventos = recordInfo.record.complementos.eventos;
        const instructions = {
          id: id_despacho,
          app: 'despacho',
          regime: 'exportacao',
        };
        this.backProcesso.generate(instructions).subscribe((response: SaveResponse) => {
          if (response.status === 'success') {
            eventos.push({
              evento: 'g_processo',
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
          formulario.setControl('id_captacao', new FormControl(id_despacho));
          this.saveOcorrencia(formulario);
        });
        break;
    }
  }

  saveOcorrencia(formulario: FormGroup): void {
    this.backEndOcorrencia.save(formulario, 'captacao').subscribe(dados => console.log(dados));
  }
}
