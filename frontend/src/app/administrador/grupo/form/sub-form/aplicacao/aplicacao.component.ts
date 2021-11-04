import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { Acesso } from '../../../model/acesso.module';

@Component({
  selector: 'app-aplicacao',
  templateUrl: './aplicacao.component.html',
  styleUrls: ['./aplicacao.component.css']
})
export class AplicacaoComponent implements OnInit, OnChanges {
  @Input('acessos') acessos: Acesso[];
  @Input('aplicacoes') aplicacoes: any[];
  @Output() sendSubModulos = new EventEmitter<Acesso>();
  @Output() sendSelectedApp = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.aplicacoes);
  }

  getSubModulos(acessos: any) {
    this.sendSubModulos.emit(acessos);
  }

}
