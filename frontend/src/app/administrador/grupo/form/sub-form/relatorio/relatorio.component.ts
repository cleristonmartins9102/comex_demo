import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Acesso } from '../../../model/acesso.module';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  @Input('acessos') acessos: Acesso;

  constructor() { }

  ngOnInit() {
  }

}
