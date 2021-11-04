import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { DialogOcorrenciaComponent } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.component';
import { OcorrenciaService } from 'src/app/shared/dialos/dialog/service/ocorrencia.service';
import { BoxemailComponent } from 'src/app/shared/dialos/boxemail/boxemail.component';

@Component({
  selector: 'app-lista-servico',
  templateUrl: './lista-servico.component.html',
  styleUrls: ['./lista-servico.component.css'],
})
export class ListaServicoComponent {
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
    private dialog: MatDialog,
  ) {
    const menu = new Menu('comercial', 'servico', 'lista de serviços');
    this.data.menu = menu.getWindowMenu();
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

      case 'ocorrencia':
        const dialogRefOcorrencia = this.dialog.open(DialogOcorrenciaComponent, {
          panelClass: 'dialog-ocorrencia-width',
        }).afterClosed().subscribe((formulario: FormGroup) => {
          formulario.setControl('id_captacao', new FormControl(id_captacao));
        });
        break;
      case 'alertar_parceiro':

      default:
        break;
    }
  }
}
