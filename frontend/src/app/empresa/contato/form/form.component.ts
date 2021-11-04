import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { StatusContatoGrupoService } from '../service/status.service';
import { ContatoEmpresaService } from '../../service/contato.service';
import { DialogFormContatoComponent } from './dialog/dialog.component';
import { GrupoDeContatoBackEndService } from '../service/backend.service';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { take } from 'rxjs/operators';
import { Grupo } from 'src/app/shared/dialos/boxemail/model/grupo-email.model';
import { AccessType } from 'src/app/shared/report/security/acess-type';


@Component({
  selector: 'app-form-grupo-contato',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormGrupoContatoComponent extends AccessType implements OnInit {
  @Output('closeSubForm') closeSubForm = new EventEmitter;
  @ViewChild('excluir') excluir: ElementRef;
  grupo: Grupo;
  grupos;
  grupoNome: string;
  nomesGruposPadroes: Observable<any>;
  field = [];
  id_terminal: any;
  identificador: Observable<any>;
  cidades: Observable<any>;
  estados: Observable<any>;
  propostas: Observable<any>;
  portos: Observable<any>;
  statusLista: Observable<any>;
  formulario: FormGroup;
  action: string;
  subFormDataContato: {};
  formEdit: Boolean = false;
  subFormExpanded = false;
  addSelectNewGroupVisible: Boolean = false;
  formSub: FormGroup;
  subFormReset: number[] = [];
  contatosDoGrupo: {};
  grupoSelected = false;
  constructor(
    private empresaDropDown: GetEmpresaService,
    private bkContatoGrupo: ContatoEmpresaService,
    private routerAct: ActivatedRoute,
    private sendForm: GrupoDeContatoBackEndService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { 
    super('empresa', 'grupodecontato', 'lista de grupos de contato');
  }

  ngOnInit() {
    this.empresaDropDown.getEmpresaAll()
      .subscribe(empresa => {
        this.identificador = empresa;
      });
    this.formulario = this.formBuilder.group({
      coadjuvante: [null, Validators.required],
      adstrito: [null, Validators.required],
      id_grupo: [null],
    });

    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = this.isLocked() ? this.isLocked() : false;

      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
      // this.sendForm.getById(id).pipe(take(1)).subscribe((d) => console.log(d));
      this.sendForm.getById(id).pipe(take(1)).subscribe((d) => this.populateForm(this.formulario, d));
    }
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) {
      return false;
    } else {
      return true;
    }
  }

  populateForm(form: FormGroup, dados) {
    // console.log(dados.id_coadjuvante);

    this.formulario.patchValue({
      coadjuvante: typeof(dados.id_coadjuvante) ? dados.id_coadjuvante : null,
      adstrito: typeof(dados.id_adstrito) ? dados.id_adstrito : null,
      id_grupo: typeof(dados.id_grupodecontato) ? dados.id_grupodecontato : null,
    });
    this.loadGrupoContato(dados.id_coadjuvante, dados.id_adstrito);
  }

  forkForm(event: FormGroup) {
    const form = this.formulario;
    form.setControl('contatos', event);
  }

  removeNomeGrupoControl() {
    this.formulario.removeControl('nome_grupo');
  }

  addItem() {
    const validators = [Validators.required, Validators.minLength(1)];
    this.formulario.addControl('nome_grupo', new FormControl('', validators));
    if (this.field.length < 1) {
      this.formulario.get('id_grupo').setValue(null);
      this.field.push(1);
      this.grupos.subscribe(dados => {
        if (typeof (dados[0].erro) !== 'undefined') {
          this.grupos = null;
        }
      });
      this.cleanSubForm();
      const idCoadjuvante = this.formulario.get('coadjuvante').value;
      const idAdstrito = this.formulario.get('adstrito').value;
      this.bkContatoGrupo.getGrupoNomesPadroes(idCoadjuvante, idAdstrito).subscribe( nomes => this.nomesGruposPadroes = nomes);
    }
  }

  setCurrentGroup(element: any) {
    this.grupoSelected = true;
    this.grupoNome = element._element.nativeElement.innerText.replace('group', '').replace('delete', '');
    this.field = [];
    this.removeNomeGrupoControl();
    const id = element._element.nativeElement.id;
    if (id != null) {
      this.formulario.get('id_grupo').setValue(id);
      this.populateGroup(this.formulario);
    }
  }

  populateGroup(group: FormGroup) {
    const model = group.get('id_grupo');
    this.bkContatoGrupo.getGrupoContato(group.get('id_grupo')).subscribe((dados: Observable<any>) => {
      this.populateContactGroup(dados);
    });
  }

  populateContactGroup(dados: Observable<any>) {
    if (typeof(dados[0]) !== 'undefined' && typeof(dados[0].erro) === 'undefined') {
      this.contatosDoGrupo = dados;
      this.subFormExpanded = true;
    }
  }

  loadGrupoContato(coadjuvante: string, adstrito: string) {
    console.log('load');
    this.field = [];
    this.grupos = this.bkContatoGrupo.getGrupoDeContato(coadjuvante, adstrito);
    this.cleanSubForm();
  }

  receivedDataSubFormContato(event: FormGroup) {
    this.formulario.addControl('contato', event);
  }

  removeGrupo(event: MouseEvent, grupo: Grupo) {
    const id = grupo.id_grupodecontato;
    event.preventDefault();
    event.stopImmediatePropagation();
    this.openDialog(id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogFormContatoComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.bkContatoGrupo.deleteGrupoDeContato(id, (response) => {
          if (response !== true) {
            this.openSnackBar('Este grupo não pode ser deletado, está sendo útilizado.', 'Alerta');
          } else {
            this.openSnackBar('Grupo deletado com sucesso', 'Informe');
            const coadjuvante: string = this.formulario.get('coadjuvante').value;
            const adstrito: string = this.formulario.get('adstrito').value;
            this.loadGrupoContato(coadjuvante, adstrito);
          }
        });
      }
    });
  }

  openDialogSave(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Grupo salvo com sucesso!' }
    }).afterClosed().subscribe(() => {
      this.backPage();
      this.cleanForm();
    });
  }

  cleanForm() {
    this.subFormExpanded = false;
    this.grupos = null;
    const form: any = this.formulario;
    form.reset();
    Object.keys(form.controls).forEach((v, k) => {
      form.controls[v].setErrors(null);
    });
    this.cleanSubForm();
  }

  cleanSubForm() {
    const form: FormGroup = this.formulario;
    // Removendo os campos dos contatos
    this.formulario.removeControl('contatos');
    this.contatosDoGrupo = [];
    this.subFormReset = [];
  }

  backPage() {
    this.router.navigate(['/empresa/grupodecontato/lista']);
  }

  onSubmite() {
    this.sendForm.save(this.formulario).subscribe((dados: { status }) => {
      if (dados.status === 'success') {
        this.subFormExpanded = false;
          this.openDialogSave();
      }
    });
  }

  removeItem(el: any) {
    const id: string = el.getAttribute('id');
  }

  show() {
    this.formulario.removeControl('contatos');
    console.log(this.formulario);
    // this.formulario.get('contato').get('contatos').removeAt(0);
  }
}

interface Estructure {
  estructure;
}
