import { Component } from '@angular/core';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-terminal',
  templateUrl: './lista-terminal.component.html',
  styleUrls: ['./lista-terminal.component.css'],
})

export class ListaTerminalComponent {
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
    const menu = new Menu('movimentacao', 'terminal', 'lista de terminais');
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    switch (recordInfo.event) {
      case 'crud':
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
