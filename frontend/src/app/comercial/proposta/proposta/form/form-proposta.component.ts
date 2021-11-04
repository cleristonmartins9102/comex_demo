import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener, AfterViewInit, ElementRef, ViewChildren } from '@angular/core'
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm, FormArray } from '@angular/forms'
import { FormValuesCompleteService } from '../../../service/form-values-complete.service'
import { ErrorStateMatcher, MatDialog, MatRadioGroup, MatRadioChange, MatSelect, MatOption } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'

import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component'
import { ContatoEmpresaService } from 'src/app/empresa/service/contato.service'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { GetServicos } from 'src/app/comercial/servico/service/get-servicos.service'
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service'
import { BackPropostaService } from '../service/back-proposta.service'
import { take } from 'rxjs/operators'
import { BackendService } from 'src/app/shared/service/backend.service'
import { pipe } from '@angular/core/src/render3/pipe'
import { MargemService } from 'src/app/shared/service/margem-backend.service'
import { AccessType } from 'src/app/shared/report/security/acess-type'
import { TerminalBackEndService } from 'src/app/movimentacao/terminal/service/backend.service'

export interface DocumentosName {
  proposta: string
  aceite: string
}
@Component({
  selector: 'app-form-proposta',
  templateUrl: './form-proposta.component.html',
  styleUrls: ['./form-proposta.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
      })),
      state('final', style({
        height: '200px',
        width: '100%',
      })),
      transition('*=>final', animate('500ms')),
      transition('*=>initial', animate('500ms'))
    ]),
  ]
})

export class FormPropostaComponent extends AccessType implements OnInit {
  appValor: Observable<any>
  action: string
  coadjuvantes: Observable<any>
  col: any = 'col-12';
  contatosGrupo: any
  clientes: Observable<any>
  documentName: DocumentosName = { aceite: null, proposta: null };
  errorMatcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();
  formEdit: Boolean = false;
  formulario: any
  grupoContato: any
  initial = 'initial';
  hintServico: string
  mc: Boolean
  numPredicados: any = 1;
  populateComplete: Boolean = false;
  progresValue: number
  propNumVisible: Boolean = true;
  proposta: any
  rangeArray: number[]
  subFormData: Object
  subFormClose: Boolean
  regimes: any
  regime = { regime: null, id_regime: null };
  vendedores: any
  margens: any[]
  form: any
  regimeClassificacao: any
  @ViewChild('cliente') cliente
  @ViewChild('optAll') optAll: MatOption
  @ViewChildren('optTerminals') optTerminals: HTMLOptionElement[]
  loaded = false;
  terminais: any[]

  constructor(
    private formDropDown: FormValuesCompleteService,
    private backEnd: BackPropostaService,
    private backEmpresa: GetEmpresaService,
    private backContato: ContatoEmpresaService,
    private backGeral: BackendService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private routerAct: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private servicos: GetServicos,
    private terminalsService: TerminalBackEndService
  ) {
    super('comercial', 'proposta', 'propostas')
    this.progresValue = 0
    this.rangeArray = new Array(100)
  }

  ngOnInit() {
    // Buscando tipos de propostas exportacao
    this.getRegimeClassificacao('2')
    // this.margemService.getAllDropDown().subscribe( (m: []) => this.margens = 'dsdsdsd')
    this.appValor = this.servicos.getPredProAppValue()
    this.backGeral.getRegimeAll().subscribe((regime: Array<any>) => {
      const reg = regime.filter(r => r.regime !== 'ambos')
      this.regimes = reg
    })
    this.subFormData = {
      title: 'Item',
      descricao: 'Itens oferecidos',
      appValor: this.appValor = this.servicos.getPredProAppValue()
    }
    this.terminalsService.getAll().subscribe(terminais => this.terminais = terminais)
    this.formulario = this.formBuilder.group({
      id_proposta: [null],
      tipo: [null, Validators.required],
      terminal: [null, Validators.required],
      numero: [null],
      mc: [null],
      cliente: [null, Validators.required],
      coadjuvante: [null, Validators.required],
      contato: [null, Validators.required],
      emissao: [null, Validators.required],
      id_regime: [null, Validators.required],
      id_regimeclassificacao: [null],
      classificacao: ['comum'],
      validade: [null, Validators.required],
      prazo_pagamento: [null, Validators.required],
      vendedor: [null, Validators.required],
      qualificacao: [null, Validators.required],
      data_aceite: [null],
      status: ['ativa', Validators.required],
      id_aceite: [null],
      id_doc_proposta: [null],
    })

    this.vendedores = this.formDropDown.getVendedores()
    this.clientes = this.formDropDown.getClientes()
    // this.coadjuvantes = this.formDropDown.getClientes();
    this.coadjuvantes = this.backEmpresa.getEmpresaPapel(['cliente', 'despachante'])
    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = this.isLocked() ? true : false
      this.propNumVisible = true
      this.col = 'col-6'
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id')
      this.backEnd.getProposta(id).pipe(take(1)).subscribe((dados: { items }) => this.populateForm(this.formulario, dados.items[0]))
    }
  }

  getRegimeClassificacao(regime: string) {
    this.backGeral.getRegimeClass(regime).subscribe(d => this.regimeClassificacao = d)
  }

  resetCoadjuvante() {
    this.formulario.get('mc').patchValue(false)
    this.formulario.get('coadjuvante').reset()
  }

  change() {
    if (this.initial === 'initial') {
      this.initial = 'final'
    } else {
      this.initial = 'initial'
    }
  }

  regimeChange(regime: MatRadioChange | { value: any }) {
    if (regime.value === '1') {
      this.regime = { regime: 'importacao', id_regime: regime.value }
    } else {
      this.regime = { regime: 'exportacao', id_regime: regime.value }
      console.log(this.regime.regime)
    }
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) {
      return false
    } else {
      return true
    }
  }

  loadListaGrupos(coadjuvante: string, cliente: string) {
    this.grupoContato = this.backContato.getGrupoContatoByEnvolvidos(coadjuvante, cliente)
  }

  async loadContatoGrupos() {
    this.contatosGrupo = this.backContato.getGrupoContato(this.formulario.get('contato'))
    return new Promise((resolve, reject) => {
      resolve('Carregado')
    })
  }

  selectAllTerminals(optElement: MatOption): void {
    const selected = optElement.selected
    const optTerminals = this.optTerminals
    for (let opt = 0; optTerminals.length > opt; opt++) {
      const elementOpt = (optTerminals['_results'][opt] as MatOption)
      const nativeElement = elementOpt['_element'].nativeElement
      const children = nativeElement.children[0]
      console.log(optTerminals['_results'][opt])
      if (selected) {
        elementOpt.deselect()
        children.classList.add('mat-pseudo-checkbox-checked')
        children.classList.add('mat-pseudo-checkbox-disabled')
        nativeElement.classList.add('disabled')
      } else {
        children.classList.remove('mat-pseudo-checkbox-checked')
        children.classList.remove('mat-pseudo-checkbox-disabled')
        nativeElement.classList.remove('disabled')
      }
      optTerminals['_results'][opt]._selected = selected
    }
  }

  setCoadjuvante() {
    const coadjuvante = this.formulario.get('coadjuvante').value
    const cliente = this.formulario.get('cliente').value
    const mc = this.formulario.get('mc')
    this.loadListaGrupos(coadjuvante, cliente)
    if (coadjuvante === cliente) {
      this.formulario.patchValue({
        coadjuvante: this.formulario.get('cliente').value
      })
      mc.patchValue(true)
    } else {
      mc.patchValue(false)
    }
  }

  setCoadjuvanteMc() {
    const cliente = this.formulario.get('cliente').value
    let mc = this.formulario.get('mc').value
    this.formulario.patchValue({
      coadjuvante: this.formulario.get('cliente').value
    })
    mc = true
    this.loadListaGrupos(cliente, cliente)
  }

  setFormIdAceite(id) {
    this.formulario.patchValue({
      id_aceite: (typeof (id !== 'undefined') ? id : null)
    })
  }

  setFormIdProposta(id) {
    this.formulario.patchValue({
      id_doc_proposta: (typeof (id !== 'undefined') ? id : null)
    })
  }

  getSubForm(predicado) {
    const subForm = this.formBuilder.group({
      id_predicado: [predicado.id_predicado],
      id_margem: [predicado.id_margem],
      id_depot: [null],
      id_cidade: [predicado.id_cidade],
      id_estado: [predicado.id_estado],
      nome: [predicado.id_predicado, Validators.required],
      descricao: [predicado.descricao],
      unidade: [predicado.unidade, Validators.required],
      valor: [predicado.valor, [Validators.required, Validators.minLength(1)]],
      aplicacao_valor: [predicado.id_predproappvalor, [Validators.required]],
      franquia_periodo: [predicado.franquia_periodo],
      valor_minimo: [predicado.valor_minimo],
      valor_maximo: [predicado.valor_maximo],
      valor_partir: [predicado.valor_partir],
      tipo_valor: [predicado.valor === 'sc' ? true : false],
      dimensao: [predicado.dimensao],

    })
    return subForm
  }

  terminalNull (value: any, form: FormGroup) {
    console.log(value)
    if (!value) {
      this.optAll.select()
      this.selectAllTerminals(this.optAll)
    } else {
      form.get('terminal').setValue(value)
    }
  }

  populateForm(formulario: FormGroup, dados: any) {
    const documentos = dados.complementos.documento
    this.documentName.proposta = typeof (documentos) !== 'undefined' ? documentos.proposta : null
    this.documentName.aceite = typeof (documentos) !== 'undefined' ? documentos.aceite : null
    const pre = typeof (dados.complementos.serviços) !== 'undefined' ? dados.complementos.serviços : []
    this.form = pre
    this.terminalNull(dados.terminal, formulario)
    formulario.patchValue(
      {
        id_proposta: dados.id_proposta,
        id_regime: dados.id_regime,
        id_depot: dados.id_depot,
        id_regimeclassificacao: dados.id_regimeclassificacao,
        tipo: dados.tipo,
        numero: dados.numero,
        cliente: dados.id_cliente,
        mc: (dados.id_cliente === dados.id_coadjuvante) ? true : false,
        coadjuvante: dados.id_coadjuvante,
        contato: dados.id_contato,
        emissao: dados.dta_emissao,
        validade: dados.dta_validade,
        prazo_pagamento: dados.prazo_pagamento,
        vendedor: dados.id_vendedor,
        qualificacao: dados.id_qualificacao,
        classificacao: dados.classificacao,
        data_aceite: dados.dta_aceite ? dados.dta_aceite : null,
        file: null,
        status: dados.status,
      }
    )
    // this.grupoContato = this.backContato.getGrupoDeContatoById(this.formulario.get('coadjuvante'));
    this.loadListaGrupos(dados.id_coadjuvante, dados.id_cliente)

    // Carrega o contato
    this.loadContatoGrupos().then((r) => {
      this.populateComplete = true
    })

    this.regimeChange({ value: dados.id_regime })
  }

  progress(value: any) {
    this.progresValue = this.progresValue + value
  }

  onUpload(event) {
    const reader = new FileReader()
    const [file] = event.target.files
    if (event.target.files && event.target.files.length) {
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.formulario.patchValue({
          file: reader.result
        })

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck()
      }
    }
  }

  resetSub() {
    const predicados = this.formulario.get('servicos').get('predicados')
    let c = 0
    while (c < predicados.length) {
      predicados.removeAt(c)
      c++
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Proposta salva com sucesso!' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (this.formulario.get('tipo').value === 'modelo') {
        this.router.navigate(['/comercial/proposta/lista-modelo-proposta'])
      } else {
        this.router.navigate(['/comercial/proposta/lista'])
      }
    })
  }

  cleanForm(formArray: FormArray) {
    const form: any = this.formulario
    form.reset()
    form.patchValue({
      status: 'ativa'
    })
    this.mc = false
    Object.keys(form.controls).forEach((v, k) => {
      form.controls[v].setErrors(null)
    })
    this.hintServico = null
    this.contatosGrupo = null
    this.openDialog()
  }

  receivedDataSubForm(event) {
    this.formulario.addControl('servicos', event)
  }

  backPage() {
    this.router.navigate(['/comercial/proposta/lista'])
  }

  onSubmite() {
    const form: any = this.formulario
    this.backEnd.save(form).subscribe((dados: any) => {
      if (dados.status === 'success') {
        this.subFormClose = false
        this.openDialog()

        // if (!this.formEdit) {
        //   // this.cleanForm(form);
        // } else {
        //   this.openDialog();
        // }
      }
    })
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched
  }
}
