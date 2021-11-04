import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GrupoAcesso } from '../../../model/grupo-acesso.model';

@Component({
  selector: 'app-grupo-acesso',
  templateUrl: './grupo-acesso.component.html',
  styleUrls: ['./grupo-acesso.component.css']
})
export class GrupoAcessoComponent implements OnInit {
  @Input('receiveDataGrupo') grupo:  GrupoAcesso;
  constructor() { }

  ngOnInit() {
  }
}
