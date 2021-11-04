import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { OnSubmiteService } from 'src/app/comercial/service/on-submite.service';
import { CheckPredicadoService } from '../../service/check-predicado.service';
import { CheckServicoService } from '../../service/check-servico.service';
import { GetServicos } from '../../service/get-servicos.service';
import { PacoteService } from '../service/back-pacote.service';
import { Pacote } from './model/pacote.model';
import { RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { Predicado } from '../../servico/form-servico/model/predicado.model';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { AccessType } from 'src/app/shared/report/security/acess-type';

@Component({
  selector: 'app-form-pacote',
  templateUrl: './form-pacote.component.html',
  styleUrls: ['./form-pacote.component.css']
})
export class FormPacoteComponent extends AccessType implements OnInit {
  formulario: FormGroup;
  formEdit: boolean = false;
  itens: any[] = [];
  hintNomeItem: string;
  listaPacotes: Pacote[];
  listaPredicados: Predicado[];
  pacote: Observable<Pacote>;
  hintServico: string;
  newItemNo = 0;
  subForm: FormGroup;
  subFormClose = false;
  errorMatcher = new CustomErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private backEnd: OnSubmiteService,
    private backEndServico: GetServicos,
    private backEndPacote: PacoteService,
    private validatePre: CheckPredicadoService,
    private validateSer: CheckServicoService,
    private dialog: MatDialog,
    private routerAct: ActivatedRoute,
    private router: Router
  ) {
    super('comercial', 'servico', 'lista de pacotes');
   }

  ngOnInit() {
    this.subForm = this.formBuilder.group({
      item: [null, [Validators.required, Validators.minLength(2)]],
      id_predicado: [null, [Validators.required]],
    });
    this.formulario = this.formBuilder.group({
      id_pacote: [null],
      id_predicado: [null, [Validators.required]],
      predicados: this.formBuilder.array([
        this.subForm
      ]),
    });
    this.backEndServico.getServicoByNome('pacote').subscribe( (pacote: Pacote[]) => this.listaPacotes = pacote );
    this.backEndServico.getPredicadosAll().subscribe((predicados: Predicado[]) => this.listaPredicados = predicados);
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = this.isLocked() ? true : false;
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
      this.backEndPacote.getById(id).subscribe((dados: Pacote) => this.populate(dados));
    }
  }

  addPredicado() {
    const fbGroup = this.createItem();
    const controlArr: any = this.formulario.controls.predicados;
    controlArr.push(fbGroup);
  }

  backPage() {
    console.log('back')
    this.router.navigate([`comercial/servico/pacote/lista`]);
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) {
      return false;
    } else {
      return true;
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      item: [null, [Validators.required, Validators.minLength(2)]],
      id_predicado: [null, [Validators.required]],
    });
  }

  cleanPredicados(formArray: FormArray) {
    this.backPage();
    const form: any = this.formulario;
    form.reset();
    form.controls.pacote.setErrors(null);
    form.controls.predicados.controls[0].controls.item.setErrors(null);
    form.controls.predicados.controls[0].controls.id_predicado.setErrors(null);
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
      .pipe(map(dados => {
        if (dados) {
          this.hintServico = 'Serviço já cadastrado, o(s) predicado(s) serão adicionados.';
        } else {
          this.hintServico = 'Serviço novo.';
        }
      }));
  }

  getControl(control: string) {
    return (<FormGroup>this.formulario.get(control)).controls;
  }

  onSubmite() {
    const form: any = this.formulario;
    this.backEndPacote.save(form).subscribe((dados: any) => {
      if (dados.status === 'success') {
        this.subFormClose = false;
        this.openDialog();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Pacote salvo com sucesso!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.backPage();
    });
  }

  populate(dados: Pacote) {
    this.formulario.patchValue({
      // Predicado que é um pacote
      id_pacote: typeof (dados.id_pacote) !== 'undefined' ? dados.id_pacote : null,
      id_predicado: typeof (dados.id_predicado) !== 'undefined' ? dados.id_predicado : null
    });
    // Remove o control predicado para criar outro
    this.formulario.removeControl('predicados');

    this.formulario.setControl('predicados', new FormArray([]));
    const predicados = dados.predicados;
    predicados.forEach((predicado: Predicado) => {
      const newPredicadoForm = this.createItem();
      newPredicadoForm.patchValue({
        item: predicado.nome,
        id_predicado: predicado.id_predicado
      });
      const controlArr: any = this.formulario.controls.predicados;
      controlArr.push(newPredicadoForm);
    });
  }


  removePredicado(idx) {
    if (idx !== 0) {
      const controlArr: any = this.formulario.controls.predicados;
      controlArr.removeAt(idx);
    }
  }

}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}
