import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { map, take } from '../../../../../../node_modules/rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { OnSubmiteService } from 'src/app/comercial/service/on-submite.service';
import { CheckPredicadoService } from '../../service/check-predicado.service';
import { CheckServicoService } from '../../service/check-servico.service';
import { GetServicos } from '../../service/get-servicos.service';
import { Servico } from './model/servico.model';
import { Predicado } from './model/predicado.model';
import { BackendService } from 'src/app/shared/service/backend.service';
import { Regime } from 'src/app/shared/model/regime.model';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { AccessType } from 'src/app/shared/report/security/acess-type';

@Component({
  selector: 'app-form-servico',
  templateUrl: './form-servico.component.html',
  styleUrls: ['./form-servico.component.css']
})
export class FormServicoComponent extends AccessType implements OnInit {
  formulario: FormGroup;
  itens: any[] = [];
  hintServico: string;
  newItemNo = 0;
  subForm: FormGroup;
  subFormClose = false;
  formEdit = false;
  servico: {};
  regimes: Regime[];
  errorMatcher = new CustomErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private routerAct: ActivatedRoute,
    private backEnd: OnSubmiteService,
    private validatePre: CheckPredicadoService,
    private validateSer: CheckServicoService,
    private dialog: MatDialog,
    private router: Router,
    private bkservice: GetServicos,
    private backendService: BackendService
  ) { 
    super('comercial', 'servico', 'lista de serviços')
  }

  ngOnInit() {
    this.subForm = this.formBuilder.group({
      id_predicado: [null],
      predicado: [null, [Validators.required, Validators.minLength(3)]],
      descricao: [null, [Validators.required, Validators.minLength(3)]],
      id_regime: [null, [Validators.required, Validators.minLength(1)]],
      in_use: [null]
    });
    this.formulario = this.formBuilder.group({
      nome: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        asyncValidators: [ this.checkServicoFound.bind(this) ],
        updateOn: 'blur'
      }
      ],
      id_servico: [null],
      predicados: this.formBuilder.array([
        this.subForm
      ]),
    });

    this.backendService.getRegimeAll().subscribe( (regime: Regime[]) => this.regimes = regime);

    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = this.isLocked() ? true : false;
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
      this.bkservice.getServicoById(id).pipe(take(1)).subscribe((d: Servico) => this.populateForm(this.formulario, d));
    }
  }

  inUse(item: FormGroup): boolean {
    const inUseCtrl = item.get('in_use');
    if (inUseCtrl.value) {
      return true;
    } else {
      return false;
    }
  }

  addPredicado() {
    const fbGroup = this.createItem();
    const controlArr: any = this.formulario.controls.predicados;
    controlArr.push(fbGroup);
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) {
      return false;
    } else {
      return true;
    }
  }

  removePredicado(idx) {
    if (idx !== 0) {
      const controlArr: any = this.formulario.controls.predicados;
      controlArr.removeAt(idx);
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id_predicado: [null],
      predicado: [null, [Validators.required, Validators.minLength(3)]],
      descricao: [null, [Validators.required, Validators.minLength(3)]],
      id_regime: [null, [Validators.required, Validators.minLength(1)]],
      in_use: [null]
    });
  }

  show() {
    console.log(this.formulario);

  }

  cleanPredicados(formArray: FormArray) {
    const form: any = this.formulario;
    form.reset();
    form.controls.nome.setErrors(null);
    form.controls.predicados.controls[0].controls.predicado.setErrors(null);
    form.controls.predicados.controls[0].controls.descricao.setErrors(null);
    let arrLen: any = form.controls.predicados.controls.length;
    while (arrLen > 0) {
      form.controls.predicados.removeAt(arrLen);
      arrLen--;
    }
    this.hintServico = null;
  }

  checkPredicadoFound(formControl: FormControl) {
      return this.validatePre.checkFoundPredicado(formControl.value)
      .pipe(
      // delay(8000),
      // tap(console.log),
      map(predicadoFound => predicadoFound ? { predicadoFound: true } : null));
  }

  checkServicoFound(formControl: FormControl) {
    return this.validateSer.checkFoundServico(formControl.value)
    .pipe(map((dados: any) => {
      if (dados.length !== 0) {
        // console.log(dados.items);
        this.hintServico = 'Serviço já cadastrado, o(s) predicado(s) serão adicionados.';
        if (!this.formEdit) {
          this.populateForm(this.formulario, dados);
        }
      } else {
        this.hintServico = 'Serviço novo.';
      }
    }));
  }

  getControl(control: string) {
    return (<FormGroup>this.formulario.get(control)).controls;
  }

  backPage() {
    this.router.navigate(['/comercial/servico/lista']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Serviço salvo com sucesso!' }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.backPage();
    });
  }

  onSubmite() {
    const form: any = this.formulario;
    this.backEnd.save(form).subscribe((dados: any) => {
      if (dados.status === 'success') {
        this.subFormClose = false;
        this.openDialog();
        this.cleanPredicados(form);
      }
    });
  }

  populateForm(form: FormGroup, dados: Servico) {
    // this.formulario.get('nome').asyncValidator(this.checkServicoFound.bind(this));
    if (this.formulario.get('nome').value !== dados.nome) {
      this.formulario.patchValue({
        nome: typeof(dados.nome) ? dados.nome : null,
      });
    }
    this.formulario.patchValue(
      {
        'id_servico': dados.id_servico
      }
    );
    // this.formulario.removeControl('predicados');
    // this.formulario.setControl('predicados', new FormArray([]));
    // Criando Subform
    (this.formulario.get('predicados') as FormArray).removeAt(0);
    const predicados = dados.predicados;
    predicados.forEach((predicado: any) => {
      const subform = this.createItem();
      subform.patchValue(
        {
          id_predicado: predicado.id_predicado,
          predicado: predicado.nome,
          descricao: predicado.descricao,
          id_regime: predicado.id_regime,
          in_use: predicado.in_use,
        }
      );
      (this.formulario.get('predicados') as FormArray).push(subform);
    });
    this.subFormClose = true;



    // let pessoa = form.get('pessoa');
    // if (dados.tipo === 'PessoaJuridica') {
    //   pessoa.patchValue({
    //     cnpj: dados.id_individuo,
    //     ie: typeof(dados.ie) ? dados.ie : null,
    //   });
    // } else {
    //   this.setCpf();
    //   pessoa = form.get('pessoa');
    //   pessoa.patchValue({
    //     rg: dados.rg,
    //     cpf: typeof(dados.id_individuo) !== 'undefined' ? dados.id_individuo : null,
    //   });
    // }


    // const endereco = form.get('endereco');
    // endereco.patchValue({
    //   logradouro: typeof(dados.endereco.logradouro) ? dados.endereco.logradouro : null,
    //   complementos: typeof(dados.endereco.complemento) ? dados.endereco.complemento : null,
    //   numero: typeof(dados.endereco.numero) ? dados.endereco.numero : null,
    //   cep: typeof(dados.endereco.cep) ? dados.endereco.cep : null,
    //   bairro: typeof(dados.endereco.bairro) ? dados.endereco.bairro : null,
    //   id_cidade: typeof(dados.endereco.cidade.id_cidade) ? dados.endereco.cidade.id_cidade : null,
    //   id_estado: typeof(dados.endereco.cidade.id_estado) ? dados.endereco.cidade.id_estado : null,
    // });
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
     return control && control.invalid && control.touched;
  }
}
