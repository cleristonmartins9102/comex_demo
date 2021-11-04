import { Component, OnInit, Input, OnChanges, ViewChild, TemplateRef, Inject, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { BackEndFaturaStatus } from '../../../service/fatura-status-back-end.service';
import { BackEndFatura } from '../../../service/back-end.service';
import { BackEndProcesso } from '../../../../processo/service/back-end.service';
import { BackEndOperacao } from 'src/app/financeiro/operacao/service/backEnd.service';
import { AccessType } from 'src/app/shared/report/security/acess-type';
// import { Captacao } from '../model/captacao.module';

@Component({
  selector: 'app-form-fatura-espelho-arm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormFatEspArmComponent extends AccessType implements OnInit, OnChanges {
  receicedItem = false;
  proposta: Observable<any>;
  statusLista: Observable<any>;
  modelo: string;
  cif: string;
  processos: Observable<any>;
  formulario: FormGroup;
  subFormData: any;
  uploadFormData: any;
  fornecedor: string = null
  subFormDataDocumentos: Object;
  formEdit: Boolean = false;
  propNumVisible: Boolean = true;
  subFormClose: Boolean;
  statusLegend: string;
  status: Observable<{}>;
  valor_total = 0;
  margem = 0;
  lock = false;
  @ViewChildren('st') st: ElementRef;
  @ViewChild('armazenagem') armazenagem: TemplateRef<any>;
  @ViewChildren('captacaoField') captacaoField: any;

  constructor(
    private faturaStatus: BackEndFaturaStatus,
    private sendForm: BackEndFatura,
    private processo: BackEndProcesso,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerAct: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {
    super('financeiro', 'fatura', 'faturas');
   }

  ngOnInit() {
    this.status = this.faturaStatus.getAll();
    this.processos = this.processo.getProcessoAllDropDown();

    this.formulario = this.formBuilder.group({
      id_fatura: [null],
      id_processo: [null, Validators.required],
      captacao: [null],
      numero: [null],
      nf: [null],
      valor: [null, Validators.required],
      valor_custo: [null, Validators.required],
      valor_lucro: [null, Validators.required],
      id_status: [null, Validators.required],
      dta_emissao: [null, Validators.required],
      dta_vencimento: [null, Validators.required],
      anexos: this.formBuilder.array([])
    });

    this.formulario.get('id_status').valueChanges.subscribe( d => {
      this.lockChange(d);
    });

    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.propNumVisible = true;
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
    }

    // Verificad se o formulário pode ser editavel
    this.formEdit = this.isLocked();
  }

  getTemplate() {
    return this.armazenagem;
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
    if (typeof (dados.valor_mercadoria) !== 'undefined' && dados.valor_mercadoria > 0) this.cif = (dados.valor_mercadoria).replace('.', ',');
    this.statusLegend = typeof (dados.status) !== 'undefined' ? dados.status : null;
    this.fornecedor = dados.fornecedor_nome;
    // Populando os dados do formulário
    formulario.patchValue({
      id_fatura: dados.id_fatura,
      id_processo: dados.id_processo,
      captacao: dados.captacao,
      numero: dados.numero,
      valor: typeof(dados.valor) !== 'undefined' ? dados.valor : null,
      valor_custo: typeof (dados.valor_custo) !== 'undefined' ? dados.valor_custo : null,
      valor_lucro: typeof (dados.valor_lucro) !== 'undefined' ? dados.valor_lucro : null,
      id_status: dados.id_faturastatus,
      nf: dados.nf,
      dta_emissao: typeof (dados.dta_emissao) !== 'undefined' && dados.dta_emissao !== null ? dados.dta_emissao + 'T03:00:00.000Z' : null,
      dta_vencimento: typeof (dados.dta_vencimento) !== 'undefined' && dados.dta_vencimento !== null ? dados.dta_vencimento + 'T03:00:00.000Z' : null,
    });
    this.captacaoField.value = dados.captacao;
    this.subFormData = dados.itens;
    this.uploadFormData = dados.complementos.anexos;
    this.formulario.get('captacao').disable();
    this.lockChange(dados.id_faturastatus)
  }

  /**
   * Bloqueia a alteração do formulario
   */
  lockChange(status) {
    this.lock = status === '2' ? true : false; 
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

  calcValueTotal(value: any, taxa: string) {
    if (typeof (value) !== 'undefined' && typeof (taxa) !== 'undefined') {
      const valorTotal = this.formulario.get('valor_item');
      const calculo = (parseFloat(taxa) * parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.'))).toString();
      valorTotal.patchValue(calculo);
      this.changedItem();
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


  /**
   * Metodo que une os formularios
   * @param form FormGroup
   */
  forkComissaoDisable(form) {
    const comissao_despachante = form.get('comissao_despachante');
    this.formulario.setControl('comissao_despachante', comissao_despachante);
  }

    /**
   * Metodo que une os formularios
   * @param form FormGroup
   */
  forkRecalculoDisable(form) {
    const recalculo = form.get('recalculo');
    this.formulario.setControl('recalculo', recalculo);
  }

  userNameCusto(): boolean {
    const user = JSON.parse(localStorage.data).name;
    if (user === 'Laura Felix' || user === 'Stephanie Martimiano' || user === 'Hayure Yamaguti' || user === 'Amós Santana') {
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

  show() {
    console.log(this.formulario);
    console.log('Clicado');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Fatura salva com sucesso!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (this.formEdit) {
        this.backPage();
      // }
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

  backPage() {
    this.router.navigate(['/financeiro/fatura/lista']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  onSubmite() {
    // Definindo modelo de fatura
    if (typeof (this.modelo) !== 'undefined') {
      this.formulario.setControl('modelo', new FormControl('armazenagem'));
    }
    this.sendForm.save(this.formulario).subscribe((dados: { status, message }) => {
      if (dados.status === 'success') {
        this.subFormClose = false;
        // if (!this.formEdit) {
        //   this.cleanForm();
        // }
        this.openDialog();
      } else if (!dados.status) {
        this.openSnackBar(dados.message.charAt(0).toUpperCase() + dados.message.slice(1), '');
      }
    });
  }
}
