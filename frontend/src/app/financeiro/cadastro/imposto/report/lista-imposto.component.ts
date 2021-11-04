import { Component } from '@angular/core';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-imposto',
  templateUrl: './lista-imposto.component.html',
  styleUrls: ['./lista-imposto.component.css'],
})

export class ListaImpostoComponent {
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
    const menu = new Menu('financeiro', 'cadastro', 'lista de impostos');
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    switch (recordInfo.event) {
      case 'crud':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'r':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/view`, recordInfo.id]);
        break;

      default:
        break;
    }
  }
}
