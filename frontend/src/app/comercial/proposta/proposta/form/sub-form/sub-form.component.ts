import { Component, OnInit, Input, Output, ViewChild, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { GetServicos } from 'src/app/comercial/servico/service/get-servicos.service';
import { FormValuesCompleteService } from 'src/app/comercial/service/form-values-complete.service';
import { MargemService } from 'src/app/shared/service/margem-backend.service';
import { DepotBackEndService } from 'src/app/movimentacao/depot/service/backend.service';
import { Estados } from 'src/app/shared/model/estados-br.model';
import { DropdownService } from 'src/app/shared/form/pessoa/service/dropdown.service';

@Component({
  selector: 'app-sub-form-proposta',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css'],
})
export class SubFormComponent implements OnInit, OnChanges {
  @ViewChild('checked') checked = false;
  @ViewChild('seletor') seletor: ElementRef;
  select = [];
  listaServicos: Observable<any>;
  listaPredicadosDoServico: Observable<any>;
  margens: any[];
  predicados;
  formulario: FormArray = new FormArray([]);
  subForm: FormGroup;
  appValor: Observable<any>;
  depots: any[];
  estados: Estados[];
  @Input() itensDaProposta;
  @Input() regime;
  @Input() receiveDataForm;
  @Input('data') data;
  @Input('formEdit') formEdit: Boolean = false;
  @Output() responseFormValue = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private predDropDw: FormValuesCompleteService,
    private servicos: GetServicos,
    private margemService: MargemService,
    private depotBackEndService: DepotBackEndService,
    private estadoService: DropdownService
  ) {
    // this.subForm = this.formBuilder.group({
    //   id_predicado: [null],
    //   id_margem: ['3'],
    //   id_depot: [null],
    //   nome: [null, Validators.required],
    //   descricao: [null],
    //   franquia_periodo: [null],
    //   valor_minimo: [null],
    //   valor_maximo: [null],
    //   valor_partir: [null],
    //   tipo_valor: [false],
    //   dimensao: [null],
    //   unidade: [null, Validators.required],
    //   valor: [null, [Validators.required, Validators.minLength(1)]],
    //   aplicacao_valor: [null, [Validators.required]],
    //   predicados: this.formBuilder.array([
    //     // this.subForm
    //   ]),
    // });


    // this.formulario = this.formBuilder.group({
    //   predicados: this.formBuilder.array([
    //     // this.subForm
    //   ]),

    // });
   }

  ngOnInit() {
    this.margemService.getAllDropDown().subscribe( (margens: any[]) => this.margens = margens)
    this.servicos.getPredProAppValue().subscribe(dados => this.appValor = dados);
    this.getPredicados('importacao');
    this.estadoService.getEstados();
    this.depotBackEndService.getAll().subscribe( depots => this.depots = depots );
  }

  ngAfterViewInit(): void {
    this.emitterFormValue();
  }

  ngOnChanges(): void {
    this.getPredicados(this.regime);
    if ( this.data && typeof this.data === 'object' ) {
      this.select = this.data;
      // this.data.forEach( predicado => this.addItem( predicado ) )
    }
  }


  remove(select, form) {
    return (id: number) => {
      select.splice(id, 1);
      form.removeAt(id);
    }
  }

  /**
   * Metodo para adicionar no FormArray de predicados o control do componente Item
   * @param item FormControl
   */
  inItem(item: FormControl) {
    this.formulario.push(item);
  }

  addItem(data = null) {
    this.select.push( data ? data : {} )
  }

  getPredicados(regime) {
    this.predDropDw.getPredicadosRegime(regime).subscribe( dados => this.predicados = dados );
  }

  emitterFormValue() {
    this.responseFormValue.emit(this.formulario);
  }

  getControl(control: string) {
    return (<FormGroup>this.formulario.get(control)).controls;
  }
}
