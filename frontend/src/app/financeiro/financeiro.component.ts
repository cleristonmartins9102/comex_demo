import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutorizatedService } from '../login/service/autorizated.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {
  buttonsConfig = [];
  appTitle: string;
  color = 'primary';
  mode = 'determinate';
  value = 50;
  constructor(
    private routerAct: ActivatedRoute,
    private autorizatedService: AutorizatedService
  ) { }

  ngOnInit() {
    const aut = this.autorizatedService.autorizatedSubModule('financeiro');
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
    if (typeof (title) !== 'undefined') {
      this.appTitle = title;
    }
  }
}
