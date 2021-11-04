import { Component, OnInit } from '@angular/core';
import { FormValuesCompleteService } from './service/form-values-complete.service';
import { AutorizatedService } from '../login/service/autorizated.service';

@Component({
  selector: 'app-comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css']
})
export class ComercialComponent implements OnInit {
  buttonsConfig = [];
  appTitle: string;
  color = 'primary';
  mode = 'determinate';
  value = 50;

  constructor(
    private formFropDown: FormValuesCompleteService,
    private autorizatedService: AutorizatedService
  ) { }

  ngOnInit() {
    const aut = this.autorizatedService.autorizatedSubModule('comercial');
    if (typeof (aut) !== 'undefined' && aut.length > 0) {
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

  appTitleReceive(title: string) {
    if (typeof (title) !== 'undefined') {
      this.appTitle = title;
    }
  }
}
