import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ColumnsModel } from './columns';
import { BackPropostaService } from '../service/back-proposta.service';
import { Menu } from './menu-permission';

@Component({
  selector: 'app-lista-proposta',
  templateUrl: './lista-proposta.component.html',
  styleUrls: ['./lista-proposta.component.css'],
})

export class ListaModeloPropostaComponent {
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  constructor(
    private col: ColumnsModel,
    private back: BackPropostaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const menu = new Menu('comercial', 'proposta', 'propostas');
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
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'filhote':
        this.back.gerarFilhote(recordInfo.id).subscribe((dados: any) => {
          if (dados.statusCode === 200) {
            this.openSnackBar('Gerando filhote', '', dados.body);
          }
        });
        break;

      default:
        break;
    }

  }

  openSnackBar(message: string, action: string, proposta: {id_proposta}) {
    this.snackBar.open(message, action, {
      duration: 2000
    }).afterDismissed().subscribe(() => {
      this.router.navigate(['/comercial/proposta/editar', proposta.id_proposta]);
    });
  }
}
