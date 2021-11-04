import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
// import { map } from '../../../../../../node_modules/rxjs/operators';
import { Router } from '@angular/router';
import { AccessType } from 'src/app/shared/report/security/acess-type';

// import { OnSubmiteService } from 'src/app/comercial/service/on-submite.service';
// import { CheckPredicadoService } from '../../service/check-predicado.service';
// import { CheckServicoService } from '../../service/check-servico.service';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent extends AccessType implements OnInit {
  formulario: FormGroup;
  itens: any[] = [];
  hintServico: string;
  newItemNo = 0;
  subForm: FormGroup;
  subFormClose = false;
  errorMatcher = new CustomErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    // private backEnd: OnSubmiteService,
    // private validatePre: CheckPredicadoService,
    // private validateSer: CheckServicoService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    super('empresa', 'empresa', 'lista de empresas');
  }

  ngOnInit() {
    this.subForm = this.formBuilder.group({
      predicado: [null, [Validators.required, Validators.minLength(3)]],
      descricao: [null, [Validators.required, Validators.minLength(3)]],
      regime: [null, [Validators.required, Validators.minLength(3)]]
    });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      contatos: this.formBuilder.array([
       this.subForm
      ]),
      endereco: this.formBuilder.group({
        logradouro: [null, Validators.required],
        numero: [null, [ Validators.required, Validators.maxLength(5) ]],
        complemento: [null],
        cep: [null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          ]
        ],
        bairro: [null, Validators.required],
        id_cidade: [null, Validators.required]
      }),
      tipo: ['PessoaJuridica', Validators.required],
      papel: [null, Validators.required]
    });
  }

  addPredicado() {
    const fbGroup = this.createItem(this.subForm);
    const controlArr: any = this.formulario.controls.predicados;
    controlArr.push(fbGroup);
  }

  removePredicado(idx) {
    if (idx !== 0) {
      const controlArr: any = this.formulario.controls.predicados;
      controlArr.removeAt(idx);
    }
  }

  createItem(fbGroup: FormGroup): FormGroup {
    if (typeof (fbGroup) !== 'undefined') {
      return this.formBuilder.group({
        predicado: [null, [Validators.required, Validators.minLength(3)]],
        descricao: [null, [Validators.required, Validators.minLength(3)]],
        regime: [null, [Validators.required, Validators.minLength(3)]]
      });
    }
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

  getControl(control: string) {
    // return (<FormGroup>this.formulario.get(control)).controls
  }

  backPage() {
    this.router.navigate(['/comercial/servico/lista']);
  }

  onSubmite() {
    const form: any = this.formulario;
    // this.backEnd.save(form).subscribe((dados: any) => {
    //   if (dados.status === 'success') {
    //     this.subFormClose = false;
    //     this.cleanPredicados(form);
    //   }
    // });
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
     return control && control.invalid && control.touched;
  }
}
