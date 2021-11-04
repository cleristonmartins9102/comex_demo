import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormValuesCompleteService } from '../../../comercial/service/form-values-complete.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { CidadeService } from 'src/app/shared/service/cidade.service';
import { EstadoService } from 'src/app/shared/service/estado.service';
import { StatusDepotService } from '../service/status.service';
import { DepotBackEndService } from '../service/backend.service';
import { Depot } from './model/depot.model';
import { AccessType } from 'src/app/shared/report/security/acess-type';
import { MargemService } from 'src/app/shared/service/margem-backend.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-form-depot',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormDepotComponent extends AccessType implements OnInit {
  id_terminal: any;
  identificador: Observable<any>;
  cidades: Observable<any>;
  estados: Observable<any>;
  propostas: Observable<any>;
  statusLista: Observable<any>;
  formulario: FormGroup;
  formEdit: Boolean = false;
  margens: Observable<any>;
  constructor(
    private formDropDown: FormValuesCompleteService,
    private empresaDropDown: GetEmpresaService,
    private bkCidade: CidadeService,
    private bkEstado: EstadoService,
    private bkStatus: StatusDepotService,
    private sendForm: DepotBackEndService,
    private formBuilder: FormBuilder,
    private routerAct: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private margemService: MargemService
  ) { 
    super('movimentacao', 'depot', 'lista de depots');
  }

  ngOnInit() {
    this.cidades = this.bkCidade.getCidade();
    this.estados = this.bkEstado.getEstado();
    this.statusLista = this.bkStatus.getAll();
    this.margemService.getAllDropDown().pipe(take(1)).subscribe( margens => this.margens = margens );
    this.identificador = this.empresaDropDown.getEmpresaPapel('fornecedor');
    this.formulario = this.formBuilder.group({
      id_depot: [null],
      identificador: [null, Validators.required],
      nome: [null,  Validators.required],
      margem: [null,  Validators.required],
      cidade: [null],
      estado: [null],
      status: [null],
    });

      // Verifica se o formulario é passivel a popular os dados
      if (this.checkIfIsEditForm(this.routerAct)) {
        this.formEdit = true;
        // Definindo que o formulário sera apenas para edicão
        const id: string = this.routerAct.snapshot.paramMap.get('id');
        this.sendForm.getById(id).subscribe((dados: Depot) => this.populateForm(dados));
      }
    // Verificad se o formulário pode ser editavel
    this.formEdit = this.isLocked();
  }

  backPage() {
    this.router.navigate(['/movimentacao/depot/lista']);
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) {
      return false;
    } else {
      return true;
    }
  }

  cleanForm() {
    const form: any = this.formulario;
    form.reset();
    Object.keys(form.controls).forEach((v, k) => {
      form.controls[v].setErrors(null);
    });
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: 'Depot salvo com sucesso!'}
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (this.formEdit) {
        this.backPage();
      // }
    });
  }

  populateForm(dados: Depot) {
    this.formulario.patchValue({
      id_depot: typeof(dados.id_depot) !== 'undefined' ? dados.id_depot : null,
      identificador: typeof(dados.id_individuo) !== 'undefined' ? dados.id_individuo : null,
      nome: typeof(dados.nome) !== 'undefined' ? dados.nome : null,
      cidade: typeof(dados.id_cidade) !== 'undefined' ? dados.id_cidade : null,
      status: typeof(dados.id_depotstatus) !== 'undefined' ? dados.id_depotstatus : null,
      margem: typeof(dados.id_margem) !== 'undefined' ? dados.id_margem : null,
    });
  }

  receivedDataSubFormDocumento(event: FormGroup) {
    this.formulario.addControl('documento', event);
  }

  receivedDataSubFormContainer(event) {
    this.formulario.addControl('container', event);
  }

  onSubmite() {
    this.sendForm.save(this.formulario).subscribe((dados: {status}) => {
      if (dados.status === 'success') {
        // if (!this.formEdit) {
         this.cleanForm();
        // } else {
          // this.router.navigate(['/captacao/depot/lista']);
        // }
      }
    });
  }
}
