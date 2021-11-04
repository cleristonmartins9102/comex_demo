import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';


@Component({
  selector: 'app-report-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})

export class ListaEmpresasComponent implements OnInit {
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  constructor(
    private col: ColumnsModel,
    private router: Router
  ) { }

  ngOnInit() {
    const menu = new Menu('empresa', 'empresa', 'lista de empresas');
    this.data.menu = menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    const id_individuo = recordInfo.record.id_individuo;
    switch (recordInfo.event) {
      case 'crud':
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.module}/editar`, id_individuo]);
        break;

      case 'r':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.module}/view`, id_individuo]);
        break;

      default:
        break;
    }
  }
}
