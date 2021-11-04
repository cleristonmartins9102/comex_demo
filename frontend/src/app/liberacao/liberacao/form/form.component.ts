import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { FormDropdownService } from '../service/form-dropdown.service';
import { BackEndFormLiberacao } from '../service/back-end.service';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { Captacao } from '../model/captacao.module';
import { AccessType } from 'src/app/shared/report/security/acess-type';


@Component({
  selector: 'app-form-liberacao',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormLiberacaoComponent extends AccessType implements OnInit {
  isLote = false;
  statusLista: Observable<any>;
  captacao: Observable<Captacao>;
  formulario: FormGroup;
  subFormData: any;
  subFormDataDocumentos: Object;
  formEdit: Boolean = false;
  propNumVisible: Boolean = true;
  subFormClose: Boolean;
  status: Observable<{}>;
  formView: boolean = false;

  constructor(
    private captacaoDropDown: FormDropdownService,
    private sendForm: BackEndFormLiberacao,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerAct: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { 
    super('liberacao', 'liberacao', 'lista de liberações')
  }

  ngOnInit() {
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

    if (id) {
      this.sendForm.getLiberacao(id).subscribe((dados: {}) => this.populateForm(this.formulario, dados));
    }

    this.captacao = this.captacaoDropDown.getCaptacao();
    this.status = this.captacaoDropDown.getLiberacaoStatus();

    // this.statusLista = this.statusDropDown.getStatus();
    this.formulario = this.formBuilder.group({
      numero: [null],
      documento: [null],
      tipo_operacao: [null],
      ref_importador: [null],
      id_liberacao: [null],
      id_captacao: [null, Validators.required],
      id_status: [1, Validators.required],
      dta_recebimento_doc: [null],
      dta_liberacao: [null],
      dta_saida_terminal: [null],
      valor_mercadoria: [null, Validators.required]
    });
    if ( this.isLocked() ) this.lockEdit();
  }

  lockEdit() {
    this.formEdit = true;
  }

  unlockEdit() {
    this.formEdit = false;
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
      numero: dados.numero,
      documento: dados.documento,
      tipo_operacao: dados.tipo_operacao,
      ref_importador: typeof (dados.ref_importador) !== 'undefined' ? dados.ref_importador : null,
      id_liberacao: dados.id_liberacao,
      id_captacao: dados.id_captacao,
      id_porto: dados.id_porto,
      id_status: dados.id_liberacaostatus,
      dta_recebimento_doc: typeof (dados.dta_recebimento_doc) !== 'undefined' && dados.dta_recebimento_doc !== null ? dados.dta_recebimento_doc + 'T03:00:00.000Z' : null,
      dta_liberacao: typeof (dados.dta_liberacao) !== 'undefined' && dados.dta_liberacao !== null ? dados.dta_liberacao + 'T03:00:00.000Z' : null,
      dta_saida_terminal: typeof (dados.dta_saida_terminal) !== 'undefined' && dados.dta_saida_terminal !== null ? dados.dta_saida_terminal + 'T03:00:00.000Z' : null,
      valor_mercadoria: dados.valor_mercadoria
    });
    this.isLote = dados.isInLote;
    this.subFormData = dados.anexos;
    if ( dados.locked ) this.lockEdit();
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
    // // Verifica se tem parametro id e se é um editor
    // if (router.snapshot.paramMap.get('id') == null) {
    //   return false;
    // } else {
    //   return true;
    // }
  }

  receiveForm(event: FormGroup) {
    // Criando controller anexos
    const form = this.formulario;
    form.setControl('anexos', new FormArray([event]));
  }

  receivedDataSubFormContainer(event) {
    this.formulario.addControl('container', event);
    // Removendo os containeres, pois a principio não é obrigatório a sua existencia
    // this.cleanSubForm();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Liberação salva com sucesso!' }
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
    // console.log(form)
    // let arrLenContainer: any = form.controls['container'].controls['containeres'].length;
    // let arrLenDocumento: any = form.controls['documento'].controls['documentos'].length;

    // Removendo os campos dos container
    // while (arrLenContainer >= 0) {
    //   form.get('container').controls['containeres'].removeAt(arrLenContainer);
    //   arrLenContainer--;
    // }
    // Removendo os campos dos documentos
    // while (arrLenDocumento >= 0) {
    //   form.get('documento').controls['documentos'].removeAt(arrLenDocumento);
    //   arrLenDocumento--;
    // }

  }

  backPage() {
    this.router.navigate(['/liberacao/liberacao/lista']);
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
        this.openDialog();

      } else {
        this.openSnackBar(dados.message.charAt(0).toUpperCase() + dados.message.slice(1), '');
      }
    });
  }
}
