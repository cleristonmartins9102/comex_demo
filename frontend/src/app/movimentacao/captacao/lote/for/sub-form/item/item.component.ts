import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
import { BackEndOperacao } from 'src/app/financeiro/operacao/service/backEnd.service';

@Component({
  selector: 'arm-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy, OnChanges {
  tiposdoc: Observable<any>;
  faturaStatus: string;
  destroed: Boolean;
  empresas: Observable<any>;
  formulario: FormGroup;
  itens: any;
  selectDisabled: Boolean;

  sb = new Subject;

  @Output() sendItem = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() sendForm = new EventEmitter;
  @Output() selfDestroy = new EventEmitter;
  @Input('id') id_componente: Number;
  @Input() receiveData: Item;
  @Input() formEdit: boolean;
  @Input('id_proposta') id_proposta: string;
  @Input('formFull') formFull: FormGroup;
  @ViewChild('delete') delete: ElementRef;
  @Input('receiveCaptacao') captacoes: FormGroup
  @Output() itemSelec = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder,
    private bkItems: GetServicos,
    private bkCaptacao: BackEndFormCaptacao,
    private backPredicado: CheckPredicadoService,
    private predDropDw: FormValuesCompleteService,
    private backGeral: BackendService,
    private bkProcesso: BackEndProcesso,
    private captacaoDropDown: BackEndOperacao,
  ) { }

  async ngOnInit() {

    this.formulario = this.formBuilder.group({
      id_captacao: [null, Validators.required],
    });

    this.captacaoDropDown.getAllDropDown().subscribe( captacoes => this.captacoes = captacoes);


    if (typeof (this.id_proposta) !== 'undefined') {
      this.emitForm();
    }
    this.emitForm();

    if (typeof (this.receiveData) !== 'undefined') {
      this.selectDisabled = true;

      this.formulario.patchValue(
        {
          id_captacao: this.receiveData.id_captacao,
        }
      );
    }
  }

  ngOnChanges() {
  }

  ngOnDestroy(): void {
  }

  itemSelected() {
    this.itemSelec.emit(this.formulario.get('id_captacao'));
  }

  onClose() {
      this.formulario.reset();
      this.selfDestroy.emit(this.id_componente);
  }

  emitForm() {
    this.sendForm.emit(this.formulario);
  }
}
