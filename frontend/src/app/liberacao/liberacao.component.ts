import { Component, OnInit, HostListener } from '@angular/core';
import { AutorizatedService } from '../login/service/autorizated.service';

@Component({
  selector: 'app-liberacao',
  templateUrl: './liberacao.component.html',
  styleUrls: ['./liberacao.component.css']
})
export class LiberacaoComponent implements OnInit {
  buttonsConfig = [];

  constructor(
    private autorizatedService: AutorizatedService
  ) {}

  ngOnInit() {
    const aut = this.autorizatedService.autorizatedSubModule('liberacao');
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

