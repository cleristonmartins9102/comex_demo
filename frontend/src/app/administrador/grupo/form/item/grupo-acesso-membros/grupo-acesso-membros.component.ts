import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { GrupoAcesso } from '../../../model/grupo-acesso.model';

@Component({
  selector: 'app-grupo-acesso-membros-item',
  templateUrl: './grupo-acesso-membros.component.html',
  styleUrls: ['./grupo-acesso-membros.component.css']
})
export class GrupoAcessoMembrosComponent implements OnInit {
  removable = true;
  @Input('receiveDataMembro') membro:  GrupoAcesso;

  constructor() { }

  ngOnInit() {
  }

}
