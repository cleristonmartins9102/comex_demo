import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Acesso } from '../../../model/acesso.module';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input('acessos') acessos: Acesso;
  @Input('subModulos') subModulos: any;
  @Output('sendItem') sendItem = new EventEmitter;
  @Output() removeItem = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  prepareOnlyForm(sub) {
    if (typeof (sub) !== 'undefined' && sub !== null) {
       return sub.filter( modulo => modulo.category === 'view');
    }
  }

}
