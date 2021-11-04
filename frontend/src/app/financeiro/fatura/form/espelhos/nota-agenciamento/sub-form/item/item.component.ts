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
import { CheckPredicadoService } from 'src/app/comercial/servico/service/check-predicado.service';

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
    private moeda: MoedaService,
    private backPredicado: CheckPredicadoService
  ) { }

  async ngOnInit() {
    this.moeda.alldropdown().subscribe( (moedas: any) => {
      this.moedas = moedas;
    });
    this.bkItems.getPredicadosAll().subscribe( pred => this.itens = pred);
    this.formulario = this.formBuilder.group({
      id_predicado: [null],
      id_faturaitem: [null],
      descricao: [null, Validators.required],
      id_moeda: [null, Validators.required],
      taxa: [null, Validators.required],
      valor_unit: [null, Validators.required],
      valor_item: [null, Validators.required],
    });

    if (typeof(this.id_proposta) !== 'undefined') {
      this.emitForm();
    }
    this.emitForm();

    if (typeof (this.receiveData) !== 'undefined') {
      this.selectDisabled = true;
      this.formulario.patchValue(
        {
          id_predicado: this.receiveData.id_predicado,
          id_faturaitem: this.receiveData.id_faturaitem,
          descricao: this.receiveData.descricao,
          id_moeda: this.receiveData.id_moeda,
          taxa: this.receiveData.taxa,
          valor_unit: this.receiveData.valor_unit,
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

  getDescricaoItem(item: Item) {
    const descricao = this.backPredicado.getDescricaoItem(item, this.itens);
    this.formulario.get('descricao').setValue(descricao);
  }
}
