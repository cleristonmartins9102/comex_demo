import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Acesso } from '../../../model/acesso.module';

@Component({
  selector: 'app-sub-modulo',
  templateUrl: './sub-modulo.component.html',
  styleUrls: ['./sub-modulo.component.css']
})
export class SubModuloComponent implements OnInit, OnChanges {
  @Input('acessos') acessos: Acesso[];
  @Input('modulos') modulos: any;
  @Output() sendFilhos = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  getSubModulos(idx_modulo: number) {
    this.sendFilhos.emit(idx_modulo);
  }
}
