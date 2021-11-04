import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Item } from './Model/item.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { GetServicos } from 'src/app/comercial/servico/service/get-servicos.service';
import { BackEndProcesso } from '../../../service/back-end.service';
import { BackEndFormCaptacao } from 'src/app/movimentacao/captacao/captacao/service/back-end.service';
import { MatSelect, MatCheckbox } from '@angular/material';
import { BackendService } from 'src/app/shared/service/backend.service';

@Component({
  selector: 'arm-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy, OnChanges {
  tiposdoc: Observable<any>;
  destroed: Boolean;
  empresas: Observable<any>;
  formulario: FormGroup;
  selectDisabled: Boolean;
  periodoLock = false;
  @ViewChild('empresaSelected') empresaSelected: MatSelect;
  @ViewChild('sel') sel: ElementRef;
  @Output() close = new EventEmitter();
  @Output() sendForm = new EventEmitter;
  @Output() selfDestroy = new EventEmitter;
  @Input('id') id_componente: Number;
  @Input() receiveData: Item;
  @Input('data') data: any;
  @Input('id_captacao') id_captacao: any;
  @Input('id_proposta') id_proposta: number;
  @Input('smartItem') smartItem: MatCheckbox;
  @Input('processo_data') processo_data: FormGroup;
  @Input('itens') itens: any;
  @Input('formEdit') formEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bkItems: GetServicos,
    private bkProcesso: BackEndProcesso,
    private backendService: BackendService,
    private bkCaptacao: BackEndFormCaptacao,
    private backPropostaService: BackPropostaService,
  ) { }

  async ngOnInit() {
    this.smartItem.change.subscribe( status => {
      this.periodoLock = status.checked;
      if (status.checked) {
        // this.formulario.get('periodo').disable();
      } else {
        // this.formulario.get('periodo').enable();
      }
    });
    // this.itens = this.bkItems.getPredicadosAll();
    this.formulario = this.formBuilder.group({
      id_processopredicado: [null],
      id_captacao: [this.id_captacao],
      id_predicado: [null, Validators.required],
      id_propostapredicado: [null],
      qtd: [null],
      dimensao: [null, Validators.required],
      dta_inicio: [typeof (this.receiveData) === 'undefined' ? this.data.get('dta_inicio').value : null],
      dta_final: [typeof (this.receiveData) === 'undefined' ? this.data.get('dta_final').value : null],
      dias_consumido: [null],
      periodo: {value: null, disabled: this.periodoLock},
      valor_item: {value: null, disabled: true},
    });

    this.formulario.get('id_predicado').valueChanges.subscribe( valor => {
      this.checkAppValorReadOnly(valor);
    }
    );

    this.data.get('itens').push(this.formulario)
    // this.emitForm();

    this.id_proposta = 1;
    if (this.id_proposta) {
      // this.bkItems.getPredicadosAll().subscribe( predicados => this.itens = predicados);
        if (typeof (this.receiveData) !== 'undefined') {
          this.selectDisabled = true;
          this.formulario.patchValue(
            {
              id_processopredicado: this.receiveData.id_processopredicado,
              id_captacao: this.receiveData.id_captacao,
              id_predicado: this.receiveData.id_predicado,
              id_propostapredicado: this.receiveData.id_propostapredicado,
              dimensao: this.receiveData.dimensao,
              qtd: this.receiveData.qtd,
              dta_inicio: typeof (this.receiveData.dta_inicio) !== 'undefined' && this.receiveData.dta_inicio ? this.receiveData.dta_inicio : null,
              dta_final: typeof (this.receiveData.dta_final) !== 'undefined' && this.receiveData.dta_final ? this.receiveData.dta_final : null,
              dias_consumido: typeof(this.receiveData.dias_consumido) !== 'undefined' ? this.receiveData.dias_consumido : null,
              valor_item: this.receiveData.valor_item,
              periodo: this.receiveData.periodo,
            }
          );
        }
    }
  }

  OnChanges(): void {
  }


  /**
   * Metodo para fazer algumas verificações antes de executar outros metodos
   */
  private checagemGeral() {
    const smart = this.smartItem.checked;
    return false;

    if (smart) {
      return true;
    }
  }

  calcValueItem() {
    const id_predicado = this.formulario.get('id_predicado').value;
    // const valor_item = this.bkProcesso.(id_predicado);
  }

  calcPeriodo() {
    if (this.checagemGeral()) {
    const id_processo = this.data.get('id_processo').value;
    const id_predicado = this.formulario.get('id_predicado').value;
    const dimensao = this.formulario.get('dimensao').value;
    const dta_inicio = this.formulario.get('dta_inicio').value;
    const dta_final = this.formulario.get('dta_final').value;
    const periodo = this.formulario.get('periodo');
      this.bkProcesso.servicoPeriodo(id_processo, id_predicado, dimensao, dta_inicio, dta_final).subscribe( (per: { legend: string, valor: number }) => {
        if (typeof (per.legend) === 'undefined') {
          periodo.setValue(per.valor);
        } else {
          periodo.setValue(1);
        } 
        this.trackItem();
      });
    }
  }


  setDimensao(option) {
    if (typeof (option.selected.id) !== 'undefined') {
      const dimensao = option.selected.id;
      this.formulario.get('dimensao').setValue(dimensao);
    }
  }

  

  getDay() {
    const dta_inicio = this.formulario.get('dta_inicio').value;
    const dta_final = this.formulario.get('dta_final').value;
    if (dta_inicio !== null && dta_final !== null) {
      const dta_inicio_dta = new Date(dta_inicio);
      const dta_final_dta = new Date(dta_final);
      const timeDiff = Math.abs(dta_inicio_dta.getTime() - dta_final_dta.getTime());
      const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // this.formulario.get('dias_consumido').setValue(dayDifference - 1);
    }
  }

  ngOnChanges() {
    // console.log(this.processo_data);
    
  }


  ngOnDestroy(): void {
  }

  onClose() {
    // this.formulario.reset();
    this.selfDestroy.emit({ id_componente: this.id_componente, id_captacao: this.id_captacao });
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


  checkAppValorReadOnly(id_predicado) {
    const list = [ 
      'Valor Mercadoria',
      'Valor Excedente',
      'sobre todos os itens',
      'por dia',
      'Contêiner',
      'sobre item de armazenagem e seguro'
    ];
    if (this.checagemGeral()) {
      if (typeof (this.itens) !== 'undefined' && this.itens.length > 0) {
        const r = this.itens.filter( el => el.id_predicado === id_predicado)
        if (r.length > 0) {
          // console.log(typeof (r[0].appvalor) !== 'undefined' ? r[0].appvalor : null)
          const resp = this.periodoLock = list.includes(typeof (r[0].appvalor) !== 'undefined' ? r[0].appvalor : null);
          if (resp) {
            if (this.formulario.get('periodo') !== null) {
              this.formulario.get('periodo').setValue(0);
              // this.formulario.get('periodo').disable()
            }
          }
        } 
      }
    }
  }

  trackItem() {
    if (this.checagemGeral()) {
      const itens = this.data.get('itens').value[0];
      const itensGroup = this.data.get('itens').controls[0].controls;
      const processo = {
        id_processo: this.data.get('id_processo').value,
        itens: itens
      }
      this.bkProcesso.getItemNecessarioData(processo).subscribe( (itensMod: any[]) => {
        itensMod.forEach( itemMod => {
          itensGroup.forEach( item => {
            if (itemMod.id_itemnecessario === item.get('id_predicado').value) {
              const dta_final_processo = this.data.get('dta_final');
              const periodo = item.get('periodo');
              const dta_inicio = item.get('dta_inicio');
              const dta_final = item.get('dta_final');
              const qtd = item.get('qtd');
              periodo.setValue(itemMod.periodo);
              dta_inicio.setValue(itemMod.dta_inicio);
              dta_final.setValue(itemMod.dta_final);
              qtd.setValue(itemMod.qtd > 0 ? itemMod.qtd : qtd.value);
              // console.log(new Date(itemMod.dta_final) > new Date(dta_final_processo.value))
              if (new Date(itemMod.dta_final) > new Date(dta_final_processo.value)) {
                dta_final_processo.setValue(itemMod.dta_final);
              }
            }
          })
        })
      });
    }
  }
}
