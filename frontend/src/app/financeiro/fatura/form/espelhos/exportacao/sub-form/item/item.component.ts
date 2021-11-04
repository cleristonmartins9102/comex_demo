import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { Item } from './Model/item.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { GetServicos } from 'src/app/comercial/servico/service/get-servicos.service';
import { MoedaService } from 'src/app/shared/form/pessoa/service/moeda.service';
import { FormValuesCompleteService } from 'src/app/comercial/service/form-values-complete.service';
import { BackendService } from 'src/app/shared/service/backend.service';
import { Regime } from 'src/app/shared/model/regime.model';
import { AccessType } from 'src/app/shared/report/security/acess-type';

@Component({
  selector: 'arm-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent extends AccessType implements OnInit, OnDestroy, OnChanges {
  moedas = [];
  tiposdoc: Observable<any>;
  destroed: Boolean;
  faturaStatus: string;
  empresas: Observable<any>;
  formulario: FormGroup;
  selectDisabled: Boolean;
  @Output() sendItem = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() sendForm = new EventEmitter;
  @Output() selfDestroy = new EventEmitter;
  @Input('id') id_componente: Number;
  @Input('locked') locked: boolean;
  @Input() receiveData: Item;
  @Input('id_proposta') id_proposta: string;
  @Input('formFull') formFull: FormGroup;
  @Input() imposto: FormControl;
  @Input('predicados') predicados: any;
  @Input('itens') itens: any;

  constructor(
    private formBuilder: FormBuilder,
    private bkItems: GetServicos,
    private moeda: MoedaService,
    private predDropDw: FormValuesCompleteService,
    private backGeral: BackendService
  ) { 
    super('financeiro', 'fatura', 'faturas');
  }

  async ngOnInit() {
    this.moeda.alldropdown().subscribe( (moedas: any) => {
      this.moedas = moedas;
    });
    if (typeof (this.imposto) !== 'undefined') {
      this.imposto.valueChanges.subscribe( imposto => {
        if (this.formulario.get('descricao').value === 'Impostos') {
          imposto = ( imposto / 0.8575 ) - imposto  ;
          this.formulario.get('valor_custo').setValue(imposto);
        }
      });
    } 

    this.backGeral.getRegimeByName('exportacao').subscribe( (regime: Regime) =>
      this.predDropDw.getPredicadosRegime(regime.id_regime).subscribe( (itens: Item) =>
        this.itens = itens
      )
    );
    this.formulario = this.formBuilder.group({
      id_predicado: [null],
      id_faturaitem: [null],
      descricao: [null, Validators.required],
      id_moeda: [ '19' , Validators.required ],
      taxa: [ 1, Validators.required ],
      valor_unit: [null, Validators.required],
      valor_item: [null, Validators.required],
      valor_custo: [null],
      locked: [ this.locked ]
    });
    this.changeStatusObserver(this.formFull);


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
          id_predicado: this.receiveData.id_predicado,
          id_faturaitem: this.receiveData.id_faturaitem,
          descricao: this.receiveData.descricao,
          id_moeda: this.receiveData.id_moeda ? this.receiveData.id_moeda : "19",
          taxa: this.receiveData.taxa ? this.receiveData.taxa : 1,
          valor_unit: this.receiveData.valor_unit,
          valor_item: this.receiveData.valor_item,
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
      }    }
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


  userNameCusto(): boolean {
    this.userNameValores();

    const user = JSON.parse(localStorage.data).name;  
    if (user === 'Laura Felix' || user === 'Hayure Yamaguti') {
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

  getDescricaoItem(item) {
    if (typeof(this.itens) !== 'undefined') {
      const id_predicado = item.value;
      item = this.itens.filter( (data: Item) => data.id_predicado === id_predicado);
      const descricao = typeof(item) !== 'undefined' && item.length > 0 ? item[0].descricao : null;
      this.formulario.get('descricao').setValue(descricao);
    }
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

   /**
   * Metodo para observar as alterações do status
   */
  changeStatusObserver(form: any) {
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
