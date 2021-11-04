import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

import { Estados } from '../../model/estados-br.model';
import { Cidades } from '../../model/cidades-br.model';
import { DropdownService } from './service/dropdown.service';
import { TipoPapelService } from './service/tipo-papel.service';
import { OnSubmiteService } from './service/on-submite.service';
import { VerificatorIdService } from './service/verify-identificador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { take } from 'rxjs/operators';
import { Pessoa } from './model/pessoa.model';
import { Papel } from './model/papel.model';
import { Contato } from './model/contato.model';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialos/dialog/dialog.component';
import { AccessType } from '../../report/security/acess-type';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent extends AccessType implements OnInit {
  formEdit = false;
  id: string;
  exp_close: boolean;
  papeis: any;
  tipoJuri = {
    cpf: false,
    cnpj: true,
    setTipo(tipo) {
      if (tipo = 'cpf') {
        this.cpf = true;
        this.cnpj = false;
      } else {
        this.cpf = false;
        this.cnpj = true;
      }
    }
  };
  classificacoes: any[] = [
    { name: 'Padrão' },
    { name: 'Operacional' },
    { name: 'Princing' },
    { name: 'Financeiro' },
    { name: 'Contabilidade' },
    { name: 'Administrativo' },
  ];

  formulario: FormGroup;
  cidades: Observable<Cidades[]>;
  estados: Observable<Estados[]>;
  subForm: FormGroup;
  ui = {
    alert: {
      statusPostPessoa: false,
      idFound: false
    }
  };

  constructor(
    private routerAct: ActivatedRoute,
    private cidadeService: DropdownService,
    private estadoService: DropdownService,
    private formBuilder: FormBuilder,
    private papelService: TipoPapelService,
    private backEnd: OnSubmiteService,
    private verifyId: VerificatorIdService,
    private empresa: GetEmpresaService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    super('empresa', 'empresa', 'lista de empresas');
  }

  ngOnInit() {
    this.subForm = this.formBuilder.group({
      id_contato: [null],
      id_individuo: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      ddi: [55, [Validators.minLength(2)]],
      ddd: [null, [Validators.minLength(2)]],
      telefone: [null],
      email: [null, [Validators.required, Validators.email]],
      classificacao: [null, Validators.required],
      in_use: [null]
    });
    this.estados = this.estadoService.getEstados();
    this.papeis = this.papelService.getPapeis();
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      id_individuo: [null],
      contatos: this.formBuilder.array([
        this.subForm
      ]),
      endereco: this.formBuilder.group({
        logradouro: [null, Validators.required],
        numero: [null, [Validators.required, Validators.maxLength(5)]],
        complemento: [null],
        cep: [null, [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(8),
        ]
        ],
        bairro: [null, Validators.required],
        id_cidade: [null, Validators.required],
        id_estado: [null],
      }),
      tipo: ['PessoaJuridica', Validators.required],
      papel: [null, Validators.required]
    });
    this.setCnpj();

    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = this.isLocked() ? this.isLocked() :  false;

      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
      this.empresa.getEmpresaById(id).pipe(take(1)).subscribe((d: Pessoa) => this.populateForm(this.formulario, d));
    }
  }

  show() {
    console.log(this.formulario);
  }

  inUse(item: FormGroup): boolean {
    const inUseCtrl = item.get('in_use');
    if (inUseCtrl.value === 'true') {
      return true;
    } else {
      return false;
    }
  }

  populateForm(form: FormGroup, dados: Pessoa) {
    this.formulario.patchValue({
      tipo: typeof(dados.tipo) ? dados.tipo : null,
      nome: typeof(dados.nome) ? dados.nome : null,
      id_individuo: typeof(dados.id_individuo) ? dados.id_individuo : null,
    });
    let pessoa = form.get('pessoa');
    if (dados.tipo === 'PessoaJuridica') {
      pessoa.patchValue({
        cnpj: dados.id_individuo,
        ie: typeof(dados.ie) ? dados.ie : null,
      });
    } else {
      this.setCpf();
      pessoa = form.get('pessoa');
      pessoa.patchValue({
        rg: dados.rg,
        cpf: typeof(dados.id_individuo) !== 'undefined' ? dados.id_individuo : null,
      });
    }


    const endereco = form.get('endereco');
    endereco.patchValue({
      logradouro: typeof(dados.endereco.logradouro) ? dados.endereco.logradouro : null,
      complementos: typeof(dados.endereco.complemento) ? dados.endereco.complemento : null,
      numero: typeof(dados.endereco.numero) ? dados.endereco.numero : null,
      cep: typeof(dados.endereco.cep) ? dados.endereco.cep : null,
      bairro: typeof(dados.endereco.bairro) ? dados.endereco.bairro : null,
      id_cidade: typeof(dados.endereco.cidade.id_cidade) ? dados.endereco.cidade.id_cidade : null,
      id_estado: typeof(dados.endereco.cidade.id_estado) ? dados.endereco.cidade.id_estado : null,
    });
    this.getCidades(dados.endereco.cidade.id_estado);

    const contatos: any = form.get('contatos');
    contatos.removeAt(0);
    dados.contato.forEach((contato: Contato, i: number) => {
      const formContato = this.createItem(this.subForm);
      formContato.patchValue({
        id_contato: typeof(contato.id_contato) ? contato.id_contato : null,
        nome: typeof(contato.nome) ? contato.nome : null,
        ddi: typeof(contato.ddi) ? contato.ddi : null,
        ddd: typeof(contato.ddd) ? contato.ddd : null,
        telefone: typeof(contato.telefone) ? contato.telefone : null,
        email: typeof(contato.email) ? contato.email : null,
        classificacao: typeof(contato.classificacao) ? contato.classificacao : null,
        in_use: typeof(contato.in_use) ? contato.in_use : null
      });
      contatos.push(formContato);
    });
    // Adicionando papeis
    const papeis = [];
    dados.papel.forEach((papel: Papel, i: number) => {
      papeis.push(parseInt(papel.id_papel));
    });
    const papelForm = form.get('papel');
    papelForm.patchValue(papeis);
  }

  addContato() {
    const fbGroup = this.createItem(this.subForm);
    const controlArr: any = this.formulario.controls.contatos;
    controlArr.push(fbGroup);
  }

  removeContato(idx: number) {
    if (idx !== 0) {
      const controlArr: any = this.formulario.controls.contatos;
      controlArr.removeAt(idx);
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

  cleanContato() {
    const controlArr: any = this.formulario.controls.contatos;
    this.exp_close = false;
    controlArr.controls.forEach((e: any, i: number) => {
      if (i) {
        controlArr.removeAt(i);
      }
    });
  }

  createItem(fbGroup: FormGroup): FormGroup {
    if (typeof (fbGroup) !== 'undefined') {
      return this.formBuilder.group({
        id_contato: [null],
        nome: [null, [Validators.required, Validators.minLength(2)]],
        ddi: [55, [Validators.minLength(2)]],
        ddd: [null, [Validators.minLength(2)]],
        telefone: [null],
        email: [null, [Validators.required, Validators.email]],
        classificacao: [null, Validators.required],
        in_use: [null]
      });
    }
  }

  getControl(control: string) {
    return (<FormGroup>this.formulario.get(control)).controls;
  }

  setCpf() {
    this.tipoJuri.cnpj = false;
    this.tipoJuri.cpf = true;
    this.formulario.removeControl('pessoa');
    this.formulario.addControl(
      'pessoa', new FormGroup({
        cpf: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
        rg: new FormControl('', Validators.required)
      })
    );
  }

  setCnpj() {
    this.tipoJuri.cpf = false;
    this.tipoJuri.cnpj = true;
    this.formulario.removeControl('pessoa');
    this.formulario.addControl(
      'pessoa', new FormGroup({
        cnpj: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(14)
        ]),
        ie: new FormControl('')
      })
    );
    this.formulario.controls.tipo.setValue('PessoaJuridica');
  }

  getCidades(id_estado: number) {
    this.cidades = this.cidadeService.getCidades(id_estado);
  }
  // função que verifica se já existe o individuo com o identificador cpf ou cnpj
  checkId(event: any) {
    const value = event.target.value;
    const resp = this.verifyId.findId(value)
      .subscribe((dados) => {
        if (dados) {
          this.ui.alert.idFound = true;
        } else {
          this.ui.alert.idFound = false;
        }
      }
      );
  }

  idStatus() {
    this.ui.alert.idFound = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: 'Pessoa salva com sucesso!'}
    });

    dialogRef.afterClosed().subscribe(result => {
        this.formulario.reset();
        this.backPage();
       });
  }

  backPage() {
    this.router.navigate(['/empresa/empresa/lista']);
  }

  onSubmite() {
    const form: any = this.formulario.controls.contatos;
    this.backEnd.save(this.formulario).subscribe((dados: any) => {
      if (dados.status === 'success') {
        this.ui.alert.statusPostPessoa = true;
        if (!this.formEdit) {
          this.cleanContato();
          this.setCnpj();
        }
        this.openDialog();
      }
    });
  }

  verificaValidTouched(campo1 = null, campo2 = null) {
    if (campo1) {
      let campo = this.formulario.get(campo1);
      if (campo2) {
        campo = campo.get(campo2);
      }
      return (!campo.valid && (campo.touched || campo.dirty)) ? true : false;
    }
  }

  verificaValidErros(campo1 = null, campo2 = null) {
    if (campo1) {
      let campo = this.formulario.get(campo1);
      if (campo2) {
        campo = campo.get(campo2);
      }
      if (campo) {
        return (campo.errors && (campo.touched || campo.dirty)) ? campo.errors : false;
      }
    }
  }
}
