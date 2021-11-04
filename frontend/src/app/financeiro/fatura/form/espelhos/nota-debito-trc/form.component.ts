import { Component, OnInit, Input, OnChanges, ViewChild, TemplateRef, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

// import { FormDropdownService } from '../service/form-dropdown.service';
// import { BackEndFormLiberacao } from '../service/back-end.service';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { Captacao } from 'src/app/liberacao/liberacao/model/captacao.module';
import { BackEndFaturaStatus } from '../../../service/fatura-status-back-end.service';
import { map } from 'rxjs/operators';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { BackEndFatura } from '../../../service/back-end.service';
import { BackEndProcesso } from '../../../../processo/service/back-end.service';
import { BackEndOperacao } from 'src/app/financeiro/operacao/service/backEnd.service';
// import { Captacao } from '../model/captacao.module';
import { log } from 'util';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';


@Component({
  selector: 'app-form-fatura-espelho-notdebtrc',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormEspNotDebTrcComponent implements OnInit, OnChanges {
  receicedItem = false;
  proposta: Observable<any>;
  statusLista: Observable<any>;
  modelo = 'notadebtrc';
  clientes: Observable<any>;
  agentesCarga: Observable<any>;
  formulario: FormGroup;
  subFormData: any;
  subFormDataDocumentos: Object;
  formEdit: Boolean = false;
  propNumVisible: Boolean = true;
  subFormClose: Boolean;
  status: Observable<{}>;
  uploadFormData: any;
  valor_total = 0;
  itensSubForm = [];
  @ViewChild('notdebtrc') notdebtrc: TemplateRef<any>;

  constructor(
    private captacaoDropDown: BackEndOperacao,
    private faturaStatus: BackEndFaturaStatus,
    private sendForm: BackEndFatura,
    private empresas: GetEmpresaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerAct: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit() {
    // this.captacoes = this.captacaoDropDown.getAllDropDown();
    this.status = this.faturaStatus.getAll();
    this.empresas.getEmpresaPapel('cliente').subscribe( cliente => {
      this.clientes = cliente;
    });
    this.empresas.getEmpresaPapel('agente de carga').subscribe( agente => {
      this.agentesCarga = agente;
    });

    this.formulario = this.formBuilder.group({
      modelo: [this.modelo],
      id_fatura: [null],
      numero: [null],
      id_cliente: [null, Validators.required],
      valor: [null, Validators.required],
      valor_custo: [null, Validators.required],
      id_status: [1, Validators.required],
      dta_emissao: [new Date(), Validators.required],
      dta_vencimento: [null, Validators.required],
    });

    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = true;
      this.propNumVisible = true;
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
    }
  }

  getTemplate() {
    return this.notdebtrc;
  }

  ngOnChanges(): void {
  }


  checkFieldDocumentDirty() {
    if (this.formulario.get('documento').value) {
      return true;
    } else {
      return false;
    }
  }

  populateForm(formulario: FormGroup, dados: any) {
    // Populando os dados do formulário
    formulario.patchValue({
      id_fatura: dados.id_fatura,
      id_cliente: dados.id_cliente,
      id_status: dados.id_faturastatus,
      numero: dados.numero,
      valor: dados.valor,
      valor_custo: typeof (dados.valor_custo) !== 'undefined' ? dados.valor_custo : null,
      dta_emissao: typeof (dados.dta_emissao) !== 'undefined' && dados.dta_emissao !== null ? dados.dta_emissao + 'T03:00:00.000Z' : null,
      dta_vencimento: typeof (dados.dta_vencimento) !== 'undefined' && dados.dta_vencimento !== null ? dados.dta_vencimento + 'T03:00:00.000Z' : null,
    });
    this.subFormData = dados.itens;
    this.uploadFormData = dados.complementos.anexos;
  }

  getSubFormDocumentos(subForm: FormGroup, data: any) {
    subForm.patchValue({
      tipo: parseInt(data.id_tipodocumento),
      id_documento: parseInt(data.id_upload),
      file_name: data.nome_original,
    });
    return subForm;
  }

  receiveValorTotal(event) {
    this.formulario.get('valor').setValue(event);
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) {
      return false;
    } else {
      return true;
    }
  }

  receiveForm(event: FormGroup, controlName: string) {
    console.log(controlName);
    this.valor_total = 0;
    // Criando controller anexos
    const form = this.formulario;
    const itens = (<any>event).controls;
    // itens.forEach(item => {
    //   // console.log(item);

    //   // if (item.value.valor_item) {
    //   //   this.valor_total = this.valor_total + parseInt(item.value.valor_item);
    //   // }
    // });
    if (!this.receicedItem) {
      // console.log(event.controls[0]);
    }
    this.receicedItem = true;

    form.setControl(controlName, new FormArray([event]));
    // this.formulario.get('valor').setValue(this.valor_total);
  }

  receivedDataSubFormContainer(event) {
    this.formulario.addControl('container', event);
    // Removendo os containeres, pois a principio não é obrigatório a sua existencia
    // this.cleanSubForm();
  }

  changedItem() {
    const valores = this.formulario.get('itens').value;
    let val = 0;
    valores[0].forEach(element => {
      const value = element.valor_item && element.valor_item !== '' ? element.valor_item : 0;
      val = val + parseFloat(value);
    });
    this.formulario.get('valor').setValue(val);
  }

  show() {
    console.log(this.subFormData);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Fatura salva com sucesso!' }
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

    this.cleanSubForm();
  }

  cleanSubForm() {
    this.itensSubForm = [];
  }

  backPage() {
    this.router.navigate(['/financeiro/fatura/lista']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  onSubmite() {
    this.sendForm.save(this.formulario).subscribe((dados: { status, message }) => {
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
