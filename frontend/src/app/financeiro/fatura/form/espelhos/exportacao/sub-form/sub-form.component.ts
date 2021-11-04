import { Component, OnInit, OnChanges, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sub-form-fatura',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css']
})
export class SubFormProcessoComponent implements OnInit, OnChanges {
  documentos: FormArray;
  @Output() sendItem = new EventEmitter;
  @Output() sendForm = new EventEmitter;
  @Input('loadContatos') contatosDoGrupo: {}[];
  @Input() expanded: Boolean;
  @Input() documentoDirty: Boolean;
  @Input('grupoNome') grupo: string;
  @Input('selectTotal') selects = [];
  @Input() dataReceive: any;
  @Input('id_proposta') id_proposta: string;
  @Input() formFull: FormGroup;
  custo_imposto = new FormControl();

  // @Input() valor_total: string;
  message: string;
  constructor(
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.documentos = this.form.array([]);
    // this.onChanges();

  }

  ngOnChanges(): void {
    this.documentos = this.form.array([]);
    if (typeof(this.dataReceive) !== 'undefined') {
      this.dataReceive.forEach(item => {
        this.selects.push({data: item});
      });

    }
    // this.calc(this.dataReceive);
    // console.log(this.dataReceive);


    // if (typeof(this.contatosDoGrupo) !== 'undefined' && this.contatosDoGrupo.length > 0) {
    //   this.selects = [];
    //   this.contatosDoGrupo.forEach((v, i) => {
    //     this.selects.push({data: v});
    //   });
    // }
  }

  // onChanges(): void {
  //   const formulario = this.dataReceive;
  //   formulario.valueChanges.subscribe(val => {
  //     this.message = `AGORA VAI`;
  //     console.log(val);
  //   });
  // }

  // calc(value: []) {
  //   let valor_total = 0;
  //   if (typeof(value) !== 'undefined') {
  //     if (value.length >= 0) {
  //       value.forEach((item: any) => {
  //         valor_total = valor_total + parseInt(item.valor_item);
  //       });
  //       this.valor_total.emit(valor_total);
  //     }
  //   }
  // }

  addSelect() {
    if (this.selects.length >= 0) {
     this.selects.push({});
    }
  }

  changedItem(descricao = null) {    
    const itens = this.formFull.get('itens').value;
    if (itens.length > 0) {
      // console.log(this.formulario.get('descricao').value);
      let custo_imposto = 0;
      let isItemImpostoLocked = false;
        itens[0].forEach(item => {
          if (item.descricao !== 'Impostos') {
            if ( item.descricao !== 'Impostos' && item.valor_custo !== null ) {
              custo_imposto = custo_imposto + parseFloat(item.valor_custo);
            }
          } else {
            isItemImpostoLocked = item.locked; 
          }
        });

        if ( descricao !== 'Impostos' && isItemImpostoLocked ) {
          this.custo_imposto.setValue(custo_imposto);
        }
      // if (this.formulario.get('descricao').value === 'Impostos') {
        // console.log('imposto', total)
        // this.formulario.get('valor_custo').setValue(total);
      // }
    }
    this.sendItem.emit();
  }

  forkForm(event: FormGroup) {
    const itens = this.documentos.controls;
    if (itens.length >= 0) {
    }
    this.documentos.push(event);
    if (this.documentos.length > 0) {
        this.sendForm.emit(this.documentos);
    }
  }

  destroy(idx: number) {
    this.documentos.removeAt(idx);
    this.selects.splice(idx, 1);
  }
}
