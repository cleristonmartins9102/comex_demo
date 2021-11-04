import { Component, OnInit, Input, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

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
  selector: 'app-form-fatura-espelho-exp',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormEspExpComponent implements OnInit, OnChanges {
  receicedItem = false;
  processos: any;
  statusLista: Observable<any>;
  modelo = 'exportacao';
  clientes: Observable<any>;
  agentesCarga: Observable<any>;
  formulario: FormGroup;
  subFormData: any;
  subFormDataDocumentos: Object;
  formEdit: Boolean = false;
  propNumVisible: Boolean = true;
  subFormClose: Boolean;
  status: Observable<{}>;
  valor_total = 0;
  margem = 0;
  itensSubForm = [];
  uploadFormData: any;

  @ViewChild('exportacao') exportacao: TemplateRef<any>;

  constructor(
    private captacaoDropDown: BackEndOperacao,
    private processo: BackEndProcesso,
    private faturaStatus: BackEndFaturaStatus,
    private sendForm: BackEndFatura,
    private empresas: GetEmpresaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerAct: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.captacoes = this.captacaoDropDown.getAllDropDown();
    this.status = this.faturaStatus.getAll();
    this.processo.getProcessoAllDropDown().subscribe((processo: [any]) => this.processos = processo);

    // this.statusLista = this.statusDropDown.getStatus();
    this.formulario = this.formBuilder.group({
      modelo: [this.modelo],
      id_fatura: [null],
      id_processo: [null],
      nf: [null, Validators.required],
      numero: [null],
      valor: [null, Validators.required],
      valor_custo: [null, Validators.required],
      id_status: [null, Validators.required],
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

    this.formulario.get('id_status').valueChanges.subscribe(status => {
      if (status === '2') {
        this.formulario.get('nf').setValidators([Validators.required])
      } else {
        this.formulario.get('nf').clearValidators();
      }
      this.formulario.get('nf').updateValueAndValidity();
    });
  }


  getTemplate() {
    return this.exportacao;
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

  margem_color() {
    if (this.margem < 30) {
      return 'red';
    }else if (this.margem > 30.1 && this.margem < 50) {
      return 'blue';
    }else if (this.margem > 50.1) {
      return 'green';
    }
  }

  calcValueTotal(value: any, taxa: string) {
    if (typeof (value) !== 'undefined' && typeof (taxa) !== 'undefined') {
      const valorTotal = this.formulario.get('valor_item');
      const calculo = (parseFloat(taxa) * parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.'))).toString();
      valorTotal.patchValue(calculo);
      this.changedItem();
    }
  }

  populateForm(formulario: FormGroup, dados: any) {
    // Populando os dados do formulário
    formulario.patchValue({
      id_fatura: dados.id_fatura,
      id_processo: dados.id_processo,
      id_status: dados.id_faturastatus,
      nf: dados.nf,
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

  receiveForm(event: FormGroup) {
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

    form.setControl('itens', new FormArray([event]));
    // this.formulario.get('valor').setValue(this.valor_total);
  }

  receivedDataSubFormContainer(event) {
    this.formulario.addControl('container', event);
    // Removendo os containeres, pois a principio não é obrigatório a sua existencia
    // this.cleanSubForm();
  }

  changedItem() {
    const itens = this.formulario.get('itens').value;
    let valorTotal = 0;
    let valorCusto = 0;
    let valorCustoImposto = 0;

    itens[0].forEach((element, k) => {

      const valueT = (element.valor_item !== '' && element.valor_item !== null && element.valor_item !== 'sc') ? element.valor_item : 0;
      const valueC = (element.valor_custo !== '' && element.valor_custo !== null) ? element.valor_custo : 0;
      
      const valurCustoImposto = (element.valor_custo !== '' && element.valor_custo !== null) && element.descricao !== 'Impostos' ? element.valor_custo : 0;
      valorCustoImposto = valorCustoImposto + parseFloat(valurCustoImposto);
      valorTotal = element.descricao.includes('Desconto') ? (valorTotal - parseFloat(valueT)) : (valorTotal + parseFloat(valueT));
      valorCusto = valorCusto + parseFloat(valueC);

    });
    const id_fatura = this.formulario.get('id_fatura').value;
    this.formulario.get('valor_custo').setValue(valorCusto);
    this.formulario.get('valor').setValue(valorTotal);

    // console.log(itens.length - 1);

    this.sendForm.calcTotal(id_fatura, valorTotal, valorCusto).subscribe((valor: any) => {
      this.margem = (valor) ? valor.margem_lucro : 0;
    }
    );
  }

  show() {
    console.log(this.formulario);
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
    this.sendForm.save(this.formulario).subscribe((dados: { message, status }) => {
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
