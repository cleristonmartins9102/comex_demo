import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { Item } from './Model/item.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { GetServicos } from 'src/app/comercial/servico/service/get-servicos.service';
import { BackEndFormCaptacao } from 'src/app/movimentacao/captacao/captacao/service/back-end.service';
import { CheckPredicadoService } from 'src/app/comercial/servico/service/check-predicado.service';
import { FormValuesCompleteService } from 'src/app/comercial/service/form-values-complete.service';
import { BackendService } from 'src/app/shared/service/backend.service';
import { Regime } from 'src/app/shared/model/regime.model';
import { AutorizatedService } from 'src/app/login/service/autorizated.service';
import { BackEndProcesso } from 'src/app/financeiro/processo/service/back-end.service';
import { MatIcon } from '@angular/material';
import { numberValidator } from 'src/app/shared/form-validation/form-validation';
import { BackEndFatura } from 'src/app/financeiro/fatura/service/back-end.service';
import { AccessType } from 'src/app/shared/report/security/acess-type';

@Component({
  selector: 'arm-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent extends AccessType implements OnInit, OnDestroy, OnChanges {
  tiposdoc: Observable<any>;
  faturaStatus: string;
  destroed: Boolean;
  empresas: Observable<any>;
  formulario: FormGroup;
  @Input('itens') itens: any;
  @Input('predicados') predicados: any;
  selectDisabled: Boolean;
  @Input('locked') locked: boolean;
  sb = new Subject;

  @Output() sendItem = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() sendForm = new EventEmitter;
  @Output() selfDestroy = new EventEmitter;
  @Input('id') id_componente: Number;
  @Input() receiveData: Item;
  @Input('id_proposta') id_proposta: string;
  @Input('formFull') formFull: FormGroup;
  @Input() imposto: FormControl;
  @ViewChild('delete') delete: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private bkItems: GetServicos,
    private bkCaptacao: BackEndFormCaptacao,
    private backPredicado: CheckPredicadoService,
    private predDropDw: FormValuesCompleteService,
    private backGeral: BackendService,
    private bkProcesso: BackEndProcesso,
  ) {

    super('financeiro', 'fatura', 'faturas');
   
  }

  async ngOnInit() {
    if (typeof (this.imposto) !== 'undefined') {
      this.imposto.valueChanges.subscribe( imposto => {
        if (this.formulario.get('descricao').value === 'Impostos') {
          imposto = ( imposto / 0.8575 ) - imposto  ;
          this.formulario.get('valor_custo').setValue(imposto);
        }
      });
    } 

    this.formulario = this.formBuilder.group({
      id_predicado: [null, Validators.required],
      id_faturaitem: [null],
      id_propostapredicado: [null],
      dta_inicio: [null],
      dta_final: [null],
      descricao: [null, Validators.required],
      qtd: [null, Validators.required],
      periodo: [null, Validators.required],
      valor_unit: [null, [ Validators.required, numberValidator.bind(this)]],
      valor_item: [null, [ Validators.required, numberValidator.bind(this) ]],
      valor_custo: [null],
      locked: [ this.locked ]
    });

    this.changeStatusObserver(this.formFull);

    if (typeof (this.id_proposta) !== 'undefined') {
      this.emitForm();
    }
    this.emitForm();

    if (typeof (this.receiveData) !== 'undefined') {
      // this.selectDisabled = true;
      
      if (this.receiveData.servico === 'Impostos') {
        this.formulario.get('valor_custo').clearValidators();
      }
      
      this.faturaStatus = this.formFull.get('id_status').value;      
      this.formulario.patchValue(
        {
          id_predicado: this.receiveData.id_predicado,
          id_faturaitem: this.receiveData.id_faturaitem,
          id_predicadoproposta: this.receiveData.id_propostapredicado,
          dta_inicio: this.receiveData.dta_inicio,
          dta_final: this.receiveData.dta_final,
          descricao: this.receiveData.descricao,
          periodo: this.receiveData.periodo,
          qtd: this.receiveData.qtd,
          valor_unit: this.receiveData.valor_unit === 'inp' ? 0 : this.receiveData.valor_unit,
          valor_item: this.receiveData.valor_item === 'inp' ? 0 : this.receiveData.valor_item,
          valor_custo: this.receiveData.valor_custo,
          locked: this.receiveData.locked === 'TRUE' ? true : false,
        }
      );
      this.locked = this.receiveData.locked === 'TRUE' ? true : false;
      const numberItem = this.id_componente;
      const totalItensLen = this.itens.length;
      // Verifica se o item é o ultimo da lista de itens, caso seja recebido via requisição ('edicao'). Feito essa condição
      // Pois a Margem de Lucro estava sendo calculada toda vez que o componente era renderizado.
      // Alterado: 16/05/2020
      if (totalItensLen > 0) {
        if ( ( totalItensLen - 1 ) === numberItem ) {
          this.changedItem();
        }
      }
    }
  }

  ngOnChanges() {
  }

  ngOnDestroy(): void {
  }

  onClose() {
    if (this.receiveData.valor_item !== 'sc') {
      this.formulario.reset();
      this.selfDestroy.emit(this.id_componente);
      this.changedItem();
    }
  }

  calcItem(valor) {
    valor = this.valueTransform(valor.value);
    const qtd = this.formulario.get('qtd').value;
    const periodo = this.formulario.get('periodo').value;
    const id_processopredicado = this.receiveData.id_processopredicado;
    this.bkProcesso.getValorItem(valor, id_processopredicado, qtd, periodo).subscribe(valor =>
      this.formulario.patchValue(
        {
          valor_item: valor
        }
      )
    );
    // this.changedItem();
  }

  /**
   * Metodo para definir se o campo vai ser apenas leitura
   * @param prop = Propriedade a ser verificada
   */
  readOnly(prop: string): boolean {
    let resp = this.locked;
    if (typeof (this.receiveData) !== 'undefined' && this.receiveData.servico !== 'Impostos') {
      // if ((this.receiveData[prop] === 'Sobre Consulta' || this.receiveData[prop] === 'sc')) {
      //   resp = false;
      // } 
      // else if ((this.receiveData[prop] === 'inp')) {
      //   resp = false;
       if ((!this.receiveData[prop])) {
        // resp = false;
      }
    }
    return resp;
  }

  valueTransform(value) {
    return value.replace('R$', '').replace(',', '.');
  }

  userNameCusto(): boolean {
    this.userNameValores();

    const user = JSON.parse(localStorage.data).name;
    if (user === 'Laura Felix' || user === 'Hayure Yamaguti' || user === 'Stephanie Martimiano' || user === 'Amós Santana') {
      return true;
    } else {
      return false;
    }
  }

 
  userValItem(): boolean {
    this.userNameValores();

    const user = JSON.parse(localStorage.data).name;
    if (user === 'Laura Felix') {
      return true;
    } else {
      return false;
    }
  }

  userNameValores(): boolean {
    const user = JSON.parse(localStorage.data).name;
    if (user === 'Laura Felix') {
      return true;
    } else {
      return false;
    }
  }


  changedItem(descricao = null) {
    this.sendItem.emit(descricao);
  }

  emitForm() {
    this.sendForm.emit(this.formulario);
  }

  receiveUploadInfo(fileInfo) {
    const form = this.formulario;
    form.patchValue({
      id_upload: fileInfo.id
    });
    this.emitForm();
  }

  getDescricaoItem(item: Item) {
    const descricao = this.backPredicado.getDescricaoItem(item, this.predicados);
    this.formulario.get('descricao').setValue(descricao);
  }
  

    /**
   * Metodo para observar as alterações do status
   */
  private changeStatusObserver(form: any) {
    (form.get('id_status') as FormControl).valueChanges.subscribe( status => {
      this.faturaStatus = status;
      }
    );
  }

  /**
   * Verifica se o formulario esta bloqueado para edicao
   */
  isLocked() {
    return super.isLocked( () => this.faturaStatus === '2' || ( this.locked && ( this.descontoImpostoLock() || this.descontoComercialLock() )))
    // return false
    // return this.faturaStatus === '2' || ( this.locked && ( this.descontoImpostoLock() || this.descontoComercialLock() ));
  }

  /**
   * Verifica se esta bloqueado para edição, para não permitir a alteração do imposto manualmente
   */
  unlock() {
    this.locked = !this.locked;
    this.formulario.get('locked').setValue(this.locked);
  }

  private descontoImpostoLock() {        
    return this.formulario.get('descricao').value === 'Impostos';
  }

  private descontoComercialLock() {
    return this.formulario.get('descricao').value === 'Desconto Comercial';
  }

  
}
