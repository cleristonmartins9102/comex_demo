import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { Item } from './Model/item.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { GetServicos } from 'src/app/comercial/servico/service/get-servicos.service';
import { MoedaService } from 'src/app/shared/form/pessoa/service/moeda.service';

@Component({
  selector: 'arm-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy, OnChanges {
  moedas = [];
  tiposdoc: Observable<any>;
  destroed: Boolean;
  empresas: Observable<any>;
  formulario: FormGroup;
  itens: any;
  selectDisabled: Boolean;
  @Output() sendItem = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() sendForm = new EventEmitter;
  @Output() selfDestroy = new EventEmitter;
  @Input('id') id_componente: Number;
  @Input() receiveData: Item;
  @Input('id_proposta') id_proposta: string;

  constructor(
    private formBuilder: FormBuilder,
    private bkItems: GetServicos,
    private moeda: MoedaService
  ) { }

  async ngOnInit() {
    this.moeda.alldropdown().subscribe( (moedas: [any]) => {
      this.moedas = moedas;
    });
    this.bkItems.getPredicadosAll().subscribe( pred => this.itens = pred);
    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required],
      cte: [null, Validators.required],
      carro: [null, Validators.required],
      ref_empresa: [null, Validators.required],
      valor_item: [null, Validators.required],
    });


    // Verificando se foi passado um número de captação para buscar os itens da proposta dela
    // if (typeof(this.id_captacao) !== 'undefined') {
    //   // this.itensProposta = this.bkItemProposta.getItens();
    // }
    if (typeof(this.id_proposta) !== 'undefined') {
      this.emitForm();
    }
    this.emitForm();

    if (typeof (this.receiveData) !== 'undefined') {
      this.selectDisabled = true;
      this.formulario.patchValue(
        {
          descricao: this.receiveData.descricao,
          cte: this.receiveData.cte,
          carro: this.receiveData.carro,
          ref_empresa: this.receiveData.ref_empresa,
          valor_item: this.receiveData.valor_item,
        }
      );
      this.changedItem();
    }
  }

  ngOnChanges() {
  }

  ngOnDestroy(): void {
  }

  onClose() {
    this.formulario.reset();
    this.selfDestroy.emit(this.id_componente);
    this.changedItem();
  }

  calcValueTotal(value: any, taxa: string) {
    if (typeof(value) !== 'undefined' && typeof(taxa) !== 'undefined') {
      const valorTotal = this.formulario.get('valor_item');
      const calculo = (parseFloat(taxa) * parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.'))).toString();          
      valorTotal.patchValue(calculo);
      this.changedItem();
    }
  }

  changedItem() {
    this.sendItem.emit();
  }

  emitForm() {
    this.sendForm.emit(this.formulario);
  }

  show(predicado) {
  }

  receiveUploadInfo(fileInfo) {
    const form = this.formulario;
    form.patchValue({
      id_upload: fileInfo.id
    });
    this.emitForm();
  }
}
