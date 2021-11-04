import { Component, OnInit } from '@angular/core';
import { AutorizatedService } from '../login/service/autorizated.service';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css']
})
export class MovimentacaoComponent implements OnInit {
  buttonsConfig = [];
  appTitle: string;

  constructor(
    private autorizatedService: AutorizatedService
  ) { }

  ngOnInit() {
    const aut = this.autorizatedService.autorizatedSubModule('movimentacao');
    aut.forEach(module => {
      const menu = {
        menu: {
          type: module.type,
          legend: module.legend
        },
        submenu: module.sub
      };
      this.buttonsConfig.push(menu);
    });
  }

  appTitleReceive(title: string) {
    if (typeof(title) !== 'undefined') {
      this.appTitle = title;
    }
  }
}

