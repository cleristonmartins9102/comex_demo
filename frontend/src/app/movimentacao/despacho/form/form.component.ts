import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { FormValuesCompleteService } from '../../../comercial/service/form-values-complete.service';
import { ColumnContainer } from './sub-form-column/container';
import { ColumnDocumentos } from './sub-form-column/documentos';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { FormDropdownService } from '../service/form-dropdown.service';
import { BackEndFormDespacho } from '../service/back-end.service';
import { TerminalBackEndService } from '../../terminal/service/backend.service';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { ContainerService } from '../../container/service/container.service';
import { Transportadora } from './model/transportadora.model';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { BackEndPorto } from 'src/app/comercial/porto/service/back-end.service';
import { AccessType } from 'src/app/shared/report/security/acess-type';
import { Depot } from '../../depot/model/depot-model';
import { DepotBackEndService } from '../../depot/service/backend.service';
import { MargemService } from 'src/app/shared/service/margem-backend.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form-despacho',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormDespachoComponent extends AccessType implements OnInit {
  id_captacao: any;
  despachantes: Observable<any>;
  clientes: Object[];
  transportadoras: Observable<Transportadora>;
  vendedores: Object[];
  propostas = [];
  terminais: Observable<any>;
  portos: Observable<any>;
  statusLista: Observable<any>;
  formulario: FormGroup;
  action: string;
  subFormDataContainer: Object;
  subFormDataDocumentos: Object;
  formEdit: Boolean = false;
  formView: Boolean = false;
  propNumVisible: Boolean = true;
  subFormClose: Boolean;
  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };
  depots: Depot[];
  bagOfAllMargens: any[];
  margens: any[];

  constructor(
    private proposta: BackPropostaService,
    private empresaDropDown: GetEmpresaService,
    private statusDropDown: FormDropdownService,
    private terminalDropDown: TerminalBackEndService,
    private porto: BackEndPorto,
    private sendForm: BackEndFormDespacho,
    private formBuilder: FormBuilder,
    private containerCol: ColumnContainer,
    private documentosCol: ColumnDocumentos,
    private container: ContainerService,
    private router: Router,
    private routerAct: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private depotBackEndService: DepotBackEndService,
    private margemService: MargemService
  ) {
    super('movimentacao', 'despacho', 'lista de despachos');
  }

  ngOnInit() {
    this.margemService.getAllDropDown()
      .pipe(
        map(margem => {
          return margem.map(mar => {
            mar.margem = mar.margem[0].toUpperCase() + mar.margem.slice(1);
            return mar;
          })
            .filter(mar => mar.margem !== 'Ambas')
        })
      )
      .subscribe((margens: any[]) => {
        this.margens = margens;
        this.bagOfAllMargens = margens;
      });
    this.depotBackEndService.getAll().subscribe(depots => this.depots = depots);
    let typeCall = null;
    let id = null;
    if (typeof (this.data.dados) !== 'undefined') {
      typeCall = 'r';
      id = this.data.dados;
    } else {
      typeCall = this.checkIfIsEditForm(this.routerAct);
      id = this.routerAct.snapshot.paramMap.get('id');
      this.propNumVisible = true;
    }

    // Definindo que o formulário sera apenas para edicão
    this.propNumVisible = true;
   
    this.empresaDropDown.getEmpresaPapel('despachante').subscribe(despachante => this.despachantes = despachante);
    this.proposta.getPropostaByRegime('exportacao').subscribe( propostas => this.propostas = propostas );
    this.terminais = this.terminalDropDown.getAll();
    this.statusLista = this.statusDropDown.getStatus();
    this.formulario = this.formBuilder.group({
      numero: [null],
      id_despacho: [null],
      id_despachante: [null],
      id_margem: [null, Validators.required ],
      id_proposta: [null, Validators.required],
      id_terminal_operacao: [null],
      id_terminal_destino: [null],
      id_status: [null, Validators.required],
      id_depot: [null, Validators.required],
      due: [null],
      bl: [null],
      imo: [null],
      ref_interna: [null, Validators.required],
    });

    this.formulario.get('id_proposta').valueChanges.subscribe( value => {
      this.checkifIsRedex(value);
    } );
    if (id) {
      this.sendForm.getDespachoById(id).subscribe((dados: { items }) => this.populateForm(this.formulario, dados));
    }

    this.subFormDataContainer = {
      title: 'Contêiner',
      descricao: 'Contêineres registrados',
      arrayName: 'containeres',
      addActivate: true,
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
    this.formEdit = this.isLocked();
  }

  ngOnChanges(): void {
    console.log(this.propostas)
    this.checkifIsRedex(this.formulario.get('id_proposta').value);
  }

  checkTypeCall() {
    if (this.formView) {
      return true;
    } else {
      return false;
    }
  }

  private checkifIsRedex(value) {
    const proposta: { regime_classificacao: string }[] = this.propostas.filter( proposta => proposta.id_proposta === value );
    console.log(this.propostas) 

      if ( proposta.length > 0 ) {
        const regime = proposta[0].regime_classificacao.trim();
        const depot = this.formulario.get('id_depot');
        if ( regime === '(redex)' ) {
          depot.enable(); 
        } else {
          depot.disable(); 
        }
      }
  }

  populateForm(formulario: FormGroup, dados: any) {
    const contLen = typeof (dados.complementos.containeres) !== 'undefined' ? dados.complementos.containeres.length : null;
    // const docLen = typeof (dados.complementos.documentos) !== 'undefined' ? dados.complementos.documentos.length : null;

    const contForm = dados.complementos.containeres;
    // const docForm = dados.complementos.documentos;

    const subFormContaineres: any = formulario.controls.container.get('containeres');
    // const subFormDocumentos: any = formulario.controls.documento.get('documentos');

    // Populando os dados do formulário
    formulario.patchValue({
      numero: dados.numero,
      id_despachante: dados.id_despachante,
      id_margem: ( typeof dados.id_margem !== 'undefined' ) ? dados.id_margem : null,
      id_despacho: dados.id_despacho,
      id_proposta: dados.id_proposta,
      id_terminal_operacao: dados.id_terminal_operacao,
      id_terminal_destino: dados.id_terminal_destino,
      id_status: dados.id_status,
      id_depot: dados.id_depot,
      due: dados.due,
      bl: dados.bl,
      ref_interna: dados.ref_interna,
    });

    // Populando subform de containeres
    // Remove todos os containeres do array
    subFormContaineres.removeAt(0);
    // Percorrendo todos os containeres recebidos
    if (contLen > 0) {
      contForm.forEach(containeres => {
        subFormContaineres.push(this.getSubFormContaineres((<{ estructure }>this.subFormDataContainer).estructure(), containeres));
      });
    }
    this.depotChanged(true);
  }

  getSubFormContaineres(subForm: FormGroup, data: any) {
    subForm.patchValue({
      codigo: data.codigo,
      tipo_container: data.id_containertipo,
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

  depotChanged(init = false) {
    const depot = this.depotCurrent;
    if ( depot.length > 0 ) {
      const id_margem = depot[0].id_margem;
      const margem = depot[0].margem;
      if ( id_margem ) {
        this.margens = this.bagOfAllMargens;
        if ( margem !== 'ambas' ) 
          this.margens = this.bagOfAllMargens.filter( (margem) => margem.id_margem === id_margem);
      }
    }
  }

  get depotCurrent() {
    const id_depot = parseInt(this.formulario.get('id_depot').value);
    if ( id_depot ) 
      return this.depots.filter( ( depot: Depot ) => depot.id_depot === id_depot );
    return [];
  }


  show() {
    console.log(this.formulario);
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
      data: { title: 'Movimentação salva com sucesso!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.formEdit) {
        this.backPage();
      }
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
    // this.hintServico = null;
  }

  backPage() {
    this.router.navigate(['/movimentacao/despacho/lista-mon']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  onSubmite() {
    this.sendForm.save(this.formulario).subscribe((dados: any) => {
      if (dados.status === 'success') {
        this.subFormClose = false;
        if (!this.formEdit) {
          this.cleanForm();
        }
        this.openDialog();
      } else if (!dados.status) {
        this.openSnackBar(dados.message.charAt(0).toUpperCase() + dados.message.slice(1), '');
      }
    });
  }
}
