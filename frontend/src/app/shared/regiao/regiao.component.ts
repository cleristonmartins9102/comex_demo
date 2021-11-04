import { Component, OnInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { DropdownService } from '../form/pessoa/service/dropdown.service';
import { take } from 'rxjs/operators';
import { Estados } from '../model/estados-br.model';
import { Cidades } from '../model/cidades-br.model';
import { MatSelect } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-regiao',
  templateUrl: './regiao.component.html',
  styleUrls: ['./regiao.component.css']
})
export class RegiaoComponent implements OnInit {
  @Input('config') config = {
    estadoLen: 6,
    cidadeLen: 6
  };
  @Input('data') data: any;
  @Input('formEdit') formEdit: any;
  @Output('outCidadeForm') outCidade = new EventEmitter;
  @Output('outCidadeNameSelected') outCidadeName = new EventEmitter;
  @ViewChildren('estado') estadoSelect: MatSelect;
  estados: any;
  cidades: Cidades[];
  cidade = new FormControl(null, Validators.required);
  estado = new FormControl;


  constructor(
    private regiaoService: DropdownService,
  ) {
  }

  ngOnInit() {
    this.getEstados();
    // this.estado.registerOnChange(() => this.getCidade());
    this.outCidade.emit(this.cidade);
  }

  show() {
    console.log(this.estado.value);
    console.log(this.data);
  }

  ngOnChanges() {
    this.setEstado();
  }

 
  getEstados() {
    this.regiaoService.getEstados().pipe(take(1)).subscribe( estados => { this.estados = estados; this.setEstado() });
  }

  setEstado() {
    if ( this.data.id_estado === null ) {
     this.estado.reset();
     return;
    }

    this.estado.setValue(this.data.id_estado);
    this.getCidade();
    return Promise.resolve;
  }

  getCidade(selected = false) {
    const id_estado = this.estado.value;
    this.regiaoService.getCidades(id_estado).subscribe(cidades => {
      this.cidades = cidades;
      if ( !selected ) {
        this.setCidade(this.data);
      } else {
        this.cidade.reset();
      }
    });
  }

  /**
   * Metodo que verifica quando o select de Cidade for alterado
   */
  cidadeChanged() {
    let names = [];
    this.cidade.value.forEach(cidade => {
      const name = this.getCidadeNome(cidade);
      if ( name ) 
        names = [...names, name];    
    });
    this.outCidadeName.emit(names);
  }

  /**
   * Metodo para verificar o nome da cidade.
   * @param cidade 
   * @return Nome da Cidade
   */
  getCidadeNome( id_cidade: number ): string {
    const cidadeCurrent = this.cidades.filter( cidade => cidade.id_cidade === id_cidade );
    return cidadeCurrent.length > 0 ? cidadeCurrent[0].nome : null;
  }


  /**
   * Metodo para setar o valor no controle cidade
   * @param data 
   */
  setCidade(data: { id_cidade: string, cidade: any[] }): void {
    if ( data.id_cidade ) {
      console.log(1)
      this.cidade.setValue([data.id_cidade]);
      return;
    }

    if ( data.cidade.length > 0 ) {
      const cidades = data.cidade;
      let cid = [];
      cidades.forEach( ( cidade: number ) =>  cid = [...cid, cidade]);
      this.cidade.setValue(cid);
    } 
  }
}
