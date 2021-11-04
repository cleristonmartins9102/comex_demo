import { Component } from '@angular/core';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cext',
  templateUrl: './lista-cext.component.html',
  styleUrls: ['./lista-cext.component.css'],
})

export class ListaCextComponent {
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  constructor(
    private col: ColumnsModel,
    private back: BackPropostaService,
    private router: Router,
  ) {
    const menu = new Menu('financeiro', 'cext', 'Lista de Custos Extras');
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    switch (recordInfo.event) {
      case 'crud':
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'r':
        console.log(recordInfo.id)
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/view`, recordInfo.id]);
        break;

      default:
        break;
    }
  }
}
