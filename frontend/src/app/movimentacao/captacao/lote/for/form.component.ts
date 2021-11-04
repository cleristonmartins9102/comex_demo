import { Component, OnInit, Input, OnChanges, ViewChild, TemplateRef, Inject, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
// import { BackEndFaturaStatus } from '../../../service/fatura-status-back-end.service';
// import { BackEndFatura } from '../../../service/back-end.service';
// import { BackEndProcesso } from '../../../../processo/service/back-end.service';
import { BackEndOperacao } from 'src/app/financeiro/operacao/service/backEnd.service';
import { BackEndFormCaptacaoLote } from '../service/back-end.service';
import { AccessType } from 'src/app/shared/report/security/acess-type';
// import { Captacao } from '../model/captacao.module';

@Component({
  selector: 'app-form-cap-lote',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormCapLoteComponent extends AccessType implements OnInit, OnChanges {
  receicedItem = false;
  proposta: Observable<any>;
  statusLista: Observable<any>;
  modelo: string;
  cif: string;
  // captacoes: Observable<any>;
  processos: Observable<any>;
  formulario: FormGroup;
  subFormData: any;
  uploadFormData: any;

  subFormDataDocumentos: Object;
  formEdit: Boolean = false;
  propNumVisible: Boolean = true;
  subFormClose: Boolean;
  statusLegend: string;
  status: Observable<{}>;
  valor_total = 0;
  margem = 0;
  @ViewChild('armazenagem') armazenagem: TemplateRef<any>;
  @ViewChildren('captacaoField') captacaoField: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routerAct: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private backEndFormCaptacaoLote: BackEndFormCaptacaoLote,
  ) {
    super('movimentacao', 'captacao', 'lista de lote');
   }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id_captacaolote: [null],
      numero: [null],
      status: [null]
    });
    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = this.isLocked();
      this.propNumVisible = true;
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');

      this.backEndFormCaptacaoLote.getById(id).subscribe((dados: any) => this.populateForm(this.formulario, dados));

    }
  }

  ngOnChanges(): void {
  }


  populateForm(formulario: FormGroup, dados: any) {
    this.formulario.patchValue({
      id_captacaolote: typeof (dados.id_captacaolote) !== 'undefined' ? dados.id_captacaolote : null,
      numero: dados.numero
    });
    this.subFormData = dados.captacao;
    // this.uploadFormData = dados.complementos.anexos;
    // this.formulario.get('captacao').disable();

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


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Lote salvo com sucesso!' }
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
    this.router.navigate(['/movimentacao/captacaolote/lista']);
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
    this.backEndFormCaptacaoLote.save(this.formulario).subscribe((dados: { status, message }) => {
      if (dados.status === 'success') {
        this.subFormClose = false;
        // this.cleanForm();
        this.openDialog();
      } else if (!dados.status) {
        this.openSnackBar(dados.message.charAt(0).toUpperCase() + dados.message.slice(1), '');
      }
    });
  }
}
