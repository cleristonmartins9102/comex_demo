import { Component, OnInit, OnChanges, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { GetServicos } from 'src/app/comercial/servico/service/get-servicos.service';

@Component({
  selector: 'app-sub-form-processo',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css']
})
export class SubFormProcessoComponent implements OnInit, OnChanges {
  documentos: FormArray;
  @Output() sendForm = new EventEmitter;
  @Input('loadContatos') contatosDoGrupo: {}[];
  @Input() expanded: Boolean;
  @Input() documentoDirty: Boolean;
  @Input('data') data: FormGroup;
  @Input('grupoNome') grupo: string;
  @Input('selectTotal') selects = [];
  @Input() dataReceive: any;
  @Input('formEdit') formEdit: boolean = false;
  @Input('id_proposta') id_proposta: number;
  @Input('regime') regime: any;
  @ViewChild('smartItem') smartItem: MatCheckbox;
  allPredicados: any;
  lote = null;
  valorMercadoria = 1000

  constructor(
    private form: FormBuilder,
    private backPropostaService: BackPropostaService,
    private getServicos: GetServicos,
  ) { }

  ngOnInit() {
    this.documentos = this.form.array([]);
    this.smartItem.checked = false;
    if ( typeof this.regime !== 'undefined' ) {
      this.getServicos.getPredicadosRegime(this.regime.regime).subscribe(servicos => this.allPredicados = servicos)
    }
    this.selects = [];
    console.log(this.dataReceive);
    
    if (typeof (this.dataReceive.itens) !== 'undefined' && this.dataReceive.itens !== null) {
      this.dataReceive.itens.forEach(item => {
        this.selects.push({ data: item });
      });
    }

  }

  ngOnChanges(): void {
    const total = [];
    this.documentos = this.form.array([]);
    if (typeof (this.dataReceive) !== 'undefined' && this.dataReceive !== null) {
      // if (typeof (this.dataReceive.all) !== 'undefined') {
      //   Object.entries(this.dataReceive.all).forEach( ( v, k ) => {
      //     const dados = { captacao: null, itens: null};
      //     dados.captacao = v[0];
      //     dados.itens = v[1];
      //     total.push(dados);
      //     this.selects.push({data: v[1]});

      //   });
      //   this.lote = total;
      // } else {
      // this.dataReceive.forEach(item => {
      //   // console.log(item);
      //   this.selects.push({data: item});
      // });
      // }
    }
  }

  addSelect() {
    if (this.selects.length >= 0) {
      this.selects.push({});
    }
  }

  forkForm(event: FormGroup) {
    this.sendForm.emit(event)
    // this.documentos.push(event);
    if (this.documentos.length > 0) {
      this.sendForm.emit(this.documentos);
    }
  }

  destroy({id_componente, id_captacao}) {
    const idx = (this.data.get('itens').value).findIndex( item => item.id_captacao === id_captacao );
    (this.data.get('itens') as FormArray).removeAt(idx !== -1 ? idx + id_componente : id_componente);
    this.selects.splice(id_componente, 1);
  }
}
