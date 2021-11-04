import { Component, OnInit, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Acesso } from '../../../model/acesso.module';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnChanges, OnDestroy {
  @Input('acessos') acessos: Acesso;
  @Input('subModulos') subModulos: any;
  @Output() sendItem = new EventEmitter;
  @Output() removeItem = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    console.log('Formulario Destruido');
  }

  prepareOnlyForm(sub) {
    if (typeof (sub) !== 'undefined' && sub !== null) {
       return sub.filter( modulo => modulo.category === 'form');
    }
  }
}
