import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ColumnsModel } from './columns';
import { BackPropostaService } from '../service/back-proposta.service';
import { Router } from '@angular/router';
import { Menu } from './menu-permission';

@Component({
  selector: 'app-rel-propostas',
  templateUrl: './rel-proposta.component.html',
  styleUrls: ['./rel-proposta.component.css'],
})

export class RelPropostaComponent {
  data: any = {
    menu: '',
    columTablePrimary: this.col.columnsTablePrimary,
    columTableSecundary: this.col.columnsTableSecundary,
  };

  constructor(
    private col: ColumnsModel,
    private back: BackPropostaService,
    private menu: Menu,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.data.menu = menu.getWindowMenu();
   }

   menuResponse(recordInfo) {
    switch (recordInfo.event) {
      case 'rw':
        this.router.navigate([`/${recordInfo.module}/${recordInfo.appname}/editar`, recordInfo.id]);
        break;

      case 'renovar':
        this.back.renovar(recordInfo.id).subscribe((dados: any) => {
          if (dados.id_proposta) {
            this.openSnackBar('Renovando proposta', 'Informe', dados);
          }
        });
        break;

      case 'versionar':
        this.back.versionar(recordInfo.id).subscribe((dados: any) => {
          if (dados.id_proposta) {
            this.openSnackBar('Gerando versão', 'Informe', dados);
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
