import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ColumnsModel } from './columns';
import { Menu } from './menu-permission';


@Component({
  selector: 'app-rel-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})

export class RelEmpresasComponent implements OnInit {
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  constructor(
    private col: ColumnsModel,
    private menu: Menu,
    private router: Router
  ) { }

  ngOnInit() {
    this.data.menu = this.menu.getWindowMenu();
  }

  menuResponse(recordInfo) {
    const id_individuo = recordInfo.record.id_individuo;
    switch (recordInfo.event) {
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.module}/editar`, id_individuo]);
        break;

      default:
        break;
    }
  }
}
