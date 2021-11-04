import { Component } from '@angular/core';

import { ColumnsModel } from './columns';
import { Router } from '@angular/router';
import { Menu } from './menu-permission';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
@Component({
  selector: 'rel-grupo-contato',
  templateUrl: './lista-grupo.component.html',
  styleUrls: ['./lista-grupo.component.css'],
})

export class RelGruposContatoComponent {
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  constructor(
    private col: ColumnsModel,
    private back: BackPropostaService,
    private menu: Menu,
    private router: Router
  ) {
    this.data.menu = menu.getWindowMenu();
   }

   menuResponse(recordInfo) {
    const id_captacao = recordInfo.id;

    switch (recordInfo.event) {
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      default:
        break;
    }
  }
}
