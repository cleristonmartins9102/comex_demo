import { Component, ViewChild, ElementRef, Input } from '@angular/core';
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
  selector: 'app-lista-item-padrao',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaItemPadraoComponent {
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  @Input() methodSearch: string = 'getAllOfProcesso';

  @ViewChild('bodySolicitarBl') bodySolicitarBl: ElementRef;

  ocorrenciaFormulario: FormGroup;
  captacaoCurrent: {};

  constructor(
    private col: ColumnsModel,
    private router: Router,
    private back: BackPropostaService,
    private dialog: MatDialog,
  ) {
    const menu = new Menu('comercial', 'servico', 'lista item padrão');
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    if (this.methodSearch === 'getAllOfProcesso') {
      recordInfo.appname = `servico/${recordInfo.appname}`
    } else {
      recordInfo.module = `financeiro`;
    }

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
