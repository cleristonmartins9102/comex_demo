import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { AutorizatedService } from '../login/service/autorizated.service';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  buttonsConfig = [];

  constructor(
    private autorizatedService: AutorizatedService
  ) { }

  ngOnInit() {
    const aut = this.autorizatedService.autorizatedSubModule('empresa');
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
}
