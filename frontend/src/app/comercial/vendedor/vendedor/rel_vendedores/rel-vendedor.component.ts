import { Component, ViewChild, ElementRef } from '@angular/core';
import { ColumnsModel } from './columns';
import { Router } from '@angular/router';

import { Menu } from './menu-permission';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogOcorrenciaComponent } from 'src/app/shared/dialos/dialog-ocorrencia/dialog-ocorrencia.component';
import { FormGroup, FormControl } from '@angular/forms';
import { OcorrenciaService } from 'src/app/shared/dialos/dialog/service/ocorrencia.service';
import { BoxemailComponent } from 'src/app/shared/dialos/boxemail/boxemail.component';

@Component({
  selector: 'app-rel-vendedor',
  templateUrl: './rel-vendedor.component.html',
  styleUrls: ['./rel-vendedor.component.css'],
})
export class RelVendedorComponent {
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
    private back: BackPropostaService,
    private dialog: MatDialog,
  ) {
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    // Definindo captacao selecionada
    this.captacaoCurrent = recordInfo.record;
    const id_captacao = recordInfo.id;

    switch (recordInfo.event) {
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'ocorrencia':
        const dialogRefOcorrencia = this.dialog.open(DialogOcorrenciaComponent, {
          panelClass: 'dialog-ocorrencia-width',
          // data: {name: this.name, animal: this.animal}
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
