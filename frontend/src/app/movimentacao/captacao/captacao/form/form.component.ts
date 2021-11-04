import { Component, OnInit, ChangeDetectorRef, Inject, AfterViewInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormValuesCompleteService } from '../../../../comercial/service/form-values-complete.service';
import { ColumnContainer } from './sub-form-column/container';
import { ColumnDocumentos } from './sub-form-column/documentos';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { BackEndPorto } from '../../../../comercial/porto/service/back-end.service';
import { FormDropdownService } from '../service/form-dropdown.service';
import { BackEndFormCaptacao } from '../service/back-end.service';
import { TerminalBackEndService } from '../../../terminal/service/backend.service';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { ContainerService } from '../../../container/service/container.service';
import { Transportadora } from './model/transportadora.model';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { ColumnBreakBulk } from './sub-form-column/break-bulk';
import { AccessType } from 'src/app/shared/report/security/acess-type';

@Component({
  selector: 'app-form-captacao',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormCaptacaoComponent extends AccessType implements OnInit {
  id_captacao: any;
  despachantes: Observable<any>;
  clientes: Object[];
  transportadoras: Observable<Transportadora>;
  vendedores: Object[];
  propostas: Observable<any>;
  terminais: any;
  portos: Observable<any>;
  statusLista: Observable<any>;
  agentesDeCarga: Observable<any>;
  formulario: FormGroup;
  documentos = new Subject;
  action: string;
  subFormDataContainer: Object;
  subFormBreakBulk: Object;
  subFormDataDocumentos: Object;
  formEdit: Boolean = false;
  formView: Boolean = false;
  break_bulk: boolean = true;
  propNumVisible: Boolean = true;
  subFormClose: Boolean;
  breakBulkData: any;
  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };
  id: number;

  observador = new Subject;

  constructor(
    private proposta: BackPropostaService,
    private empresaDropDown: GetEmpresaService,
    private statusDropDown: FormDropdownService,
    private terminalDropDown: TerminalBackEndService,
    private porto: BackEndPorto,
    private sendForm: BackEndFormCaptacao,
    private formBuilder: FormBuilder,
    private containerCol: ColumnContainer,
    private columnBreakBulk: ColumnBreakBulk,
    private documentosCol: ColumnDocumentos,
    private container: ContainerService,
    private router: Router,
    private routerAct: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    super('movimentacao', 'captacao', 'lista monitorada');
   }
  

  ngOnInit() {
    // Verifica se o formulario é passivel a popular os dados
    let typeCall = null;
    let id = null;
    if (typeof (this.data.dados) !== 'undefined') {
      typeCall = 'r';
      id = this.data.dados;
    } else {
      typeCall = this.checkIfIsEditForm(this.routerAct);
      id = this.routerAct.snapshot.paramMap.get('id');
    }

    if (typeof (typeCall) !== 'undefined') {
      switch (typeCall) {
        case 'crud':
          this.formEdit = true;
          break;

        case 'rw':
          this.formEdit = true;
          break;

        case 'r':
          this.formView = true;
          break;

        default:
          break;
      }
    }

    // Definindo que o formulário sera apenas para edicão
    this.propNumVisible = true;
    if (id) {
      this.sendForm.getCaptacao(id).subscribe((dados: { items }) => this.populateForm(this.formulario, dados.items[0]));
    }

    this.subFormDataContainer = {
      title: 'Contêiner',
      descricao: 'Contêineres registrados',
      arrayName: 'containeres',
      addActivate: true,
      deleteActivate: true,
      columns: this.containerCol.getCol(),
      estructure: () => {
        return this.formBuilder.group({
          codigo: [null],
          tipo_container: [null],
        });
      }
    };

    const column = (<{ columns }>this.subFormDataContainer).columns;

    // Verificando se é servico
    column.forEach((col: { config, generalname }) => {
      if (col.config.element.service) {
        // Injetando o observable com as empresas no subform para formar o select
        if (col.generalname === 'conteinertipo') {
          col.config.element.option.values = this.container.getTipos();
        }
      }
    });
    this.despachantes = this.empresaDropDown.getEmpresaPapel('despachante');
    this.transportadoras = this.empresaDropDown.getEmpresaPapel('transportadora');
    this.agentesDeCarga = this.empresaDropDown.getEmpresaPapel('agente de carga');
    this.portos = this.porto.getPortoAll();
    this.terminais = this.terminalDropDown.getAll();
    this.statusLista = this.statusDropDown.getStatus();
    this.formulario = this.formBuilder.group({
      id_margem: ['3'],
      numero: [null],
      id_proposta: [null, Validators.required],
      id_despachante: [null],
      id_porto: [null],
      id_transportadora: [null],
      id_terminal_atracacao: [null],
      id_agentedecarga: [null],
      id_terminal_redestinacao: [null],
      id_status: [null, Validators.required],
      ref_gralsin: [null],
      ref_importador: [null],
      nome_navio: [null],
      bl: [null],
      mbl: [null],
      cm: [null],
      ch: [null],
      imo: ['nao', Validators.required],
      break_bulk: ['nao', Validators.required],
      anvisa: ['nao', Validators.required],
      mapa: ['nao', Validators.required],
      carga_perigosa: ['nao', Validators.required],
      observacoes: [null],
      dta_prevista_atracacao: [null],
      dta_atracacao: [null],
    });
    this.formEdit = this.isLocked();
  }

  getPropostas (): Promise<void> {
    const id_terminalredestinacao = this.formulario.get('id_terminal_redestinacao').value
    return new Promise(resolve => this.proposta.getPropostaByRegimeAndTerminal('importacao', id_terminalredestinacao).subscribe(terminais => {
      this.propostas = terminais
      resolve(terminais)
    })
    )
  }
  
  checkTypeCall() {
    if (this.formView) {
      return true;
    } else {
      return false;
    }
  }

  async populateForm(formulario: FormGroup, dados: any) {
    const contLen = typeof (dados.complementos.containeres) !== 'undefined' ? dados.complementos.containeres.length : null;
    const contForm = dados.complementos.containeres
    const subFormContaineres: any = formulario.controls.container.get('containeres');
    if (dados.break_bulk) {
      this.break_bulk = true; 
    }
    if (dados.id_terminal_redestinacao) {
      await this.getPropostas()
    }
    this.id = dados.id_captacao;
    // Populando os dados do formulário
    formulario.patchValue({
      id_margem: dados.id_margem,
      numero: dados.numero,
      id_proposta: dados.id_proposta,
      id_despachante: dados.id_despachante,
      id_porto: dados.id_porto,
      id_transportadora: dados.id_transportadora,
      id_terminal_atracacao: dados.id_terminal_atracacao,
      id_terminal_redestinacao: dados.id_terminal_redestinacao,
      id_status: dados.id_status,
      id_agentedecarga: dados.id_agentedecarga,
      ref_gralsin: dados.ref_gralsin,
      ref_importador: dados.ref_importador,
      nome_navio: dados.nome_navio,
      observacoes: dados.observacoes,
      bl: dados.bl,
      mbl: dados.mbl,
      cm: dados.cm,
      ch: dados.ch,
      imo: dados.imo,
      break_bulk: dados.break_bulk,
      anvisa: dados.anvisa,
      mapa: dados.mapa,
      carga_perigosa: dados.carga_perigosa,

      dta_prevista_atracacao: typeof (dados.dta_prevista_atracacao) !== 'undefined' && dados.dta_prevista_atracacao ? dados.dta_prevista_atracacao + 'T03:00:00.00Z' : null,
      dta_atracacao: typeof (dados.dta_atracacao) !== 'undefined' && dados.dta_atracacao ? dados.dta_atracacao + 'T03:00:00.000Z' : null
    });

    this.breakBulkData = dados.complementos.break_bulk_info;

    // Populando subform de containeres
    // Remove todos os containeres do array
    subFormContaineres.removeAt(0);

    // Percorrendo todos os containeres recebidos
    if (contLen > 0) {
      contForm.forEach(containeres => {
        subFormContaineres.push(this.getSubFormContaineres((<{ estructure }>this.subFormDataContainer).estructure(), containeres));
      });
    }

    this.documentos.next(dados.complementos.documentos);
  }

  getSubFormContaineres(subForm: FormGroup, data: any) {
    subForm.patchValue({
      codigo: data.codigo,
      tipo_container: data.id_containertipo,
    });
    return subForm;
  }

  getSubFormBreakBulk(subForm: FormGroup, data: any) {
    subForm.patchValue({
      pesoBruto: data.peso,
      metroCubico: data.metro_cubico,
    });
    return subForm;
  }

  getSubFormDocumentos(subForm: FormGroup, data: any) {
    subForm.patchValue({
      tipo: parseInt(data.id_tipodocumento),
      id_documento: parseInt(data.id_upload),
      file_name: data.nome_original,
    });
    return subForm;
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    const url = router.snapshot.url;
    // Verifica se tem parametro id e se é um editor
    let tipo = '';
    url.forEach((urlRouter: any) => {
      switch (urlRouter.path) {
        case 'view':
          tipo = 'r';
          break;

        case 'editar':
          tipo = 'rw';
          break;
        default:
          break;
      }
    });
    return tipo;
  }


  receivedDataSubFormDocumento(event: FormGroup) {
    this.formulario.addControl('documento', event);
    // Removendo os documentos, pois a principio não é obrigatório a sua existencia
    // this.cleanSubForm();
  }

  receivedDataSubFormContainer(event) {
    this.formulario.addControl('container', event);
    // Removendo os containeres, pois a principio não é obrigatório a sua existencia
    // this.cleanSubForm();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Captação salva com sucesso!' }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.backPage();
    });
  }

  cleanForm() {
    this.subFormClose = false;
    const form: any = this.formulario;
    form.reset();
    Object.keys(form.controls).forEach((v, k) => {
      form.controls[v].setErrors(null);
    });
    this.backPage();
    this.cleanSubForm();
    // this.hintServico = null;
  }

  cleanSubForm() {
    const form: any = this.formulario;
    let arrLenContainer: any = form.controls['container'].controls['containeres'].length;
    let arrLenDocumento: any = form.controls['documento'].controls['documentos'].length;

    // Removendo os campos dos container
    while (arrLenContainer >= 0) {
      form.get('container').controls['containeres'].removeAt(arrLenContainer);
      arrLenContainer--;
    }
    // Removendo os campos dos documentos
    while (arrLenDocumento >= 0) {
      form.get('documento').controls['documentos'].removeAt(arrLenDocumento);
      arrLenDocumento--;
    }

  }

  receiveDocumentos(documentos): void {
    this.formulario.setControl('documentos', new FormControl(documentos));
  }

  backPage() {
    this.router.navigate(['/movimentacao/captacao/lista-mon']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  userNameStatusChange(): boolean {
    const user = JSON.parse(localStorage.data).name;
    if (user === 'Laura Felix' || user === 'Bianca de Paula' || user === 'Simone Felix') {
      return true;
    } else {
      return false;
    }
  }

  isInativatedProposta (status: string): boolean {
    return status === 'inativa'
  }

  whoCancelCaptacao (status: string) {
    if (this.userNameStatusChange()) return false
    if (status == 'Cancelada') return true
  }

  onSubmite() {
    this.sendForm.save(this.formulario).subscribe((dados: any) => {
      if (dados.status === 'success') {
        this.subFormClose = false;
        if (!this.formEdit) {
          this.cleanForm();
        }
        this.openDialog();
      } else if (!dados.status || dados.status == 'fail' ) {
        this.openSnackBar(dados.message.charAt(0).toUpperCase() + dados.message.slice(1), '');
      }
    });
  }
}
