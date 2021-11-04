import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Vendedor } from './model/vendedor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VendedorService } from '../../service/backend.service';
import { DialogComponent } from 'src/app/shared/upload/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { AccessType } from 'src/app/shared/report/security/acess-type';

@Component({
  selector: 'app-form-vendedor',
  templateUrl: './form-vendedor.component.html',
  styleUrls: ['./form-vendedor.component.css']
})
export class FormVendedorComponent extends AccessType implements OnInit {
  formulario: FormGroup;
  vendedor: Observable<Vendedor>;
  vendedorStatus: Observable<any>;
  formEdit: boolean = false;
  pessoas: any;

  constructor(
    private formBuilder: FormBuilder,
    private routerAct: ActivatedRoute,
    private router: Router,
    private bkvendedor: VendedorService,
    private dialog: MatDialog,
    private getEmpresaService: GetEmpresaService
  ) { 
    super('comercial', 'vendedor', 'vendedores');
  }

  ngOnInit() {
    this.getEmpresaService.getEmpresaPapel('colaborador').subscribe( colaboradores => this.pessoas = colaboradores);
    this.bkvendedor.getVendedorStatus().subscribe( ( status: Observable<any> ) => this.vendedorStatus = status );
    this.formulario = this.formBuilder.group({
      id_vendedor: [null],
      id_vendedorstatus: [null],
      id_individuo: [null, Validators.required],
      apelido: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });

    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = this.isLocked();
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
      this.bkvendedor.getById(id).subscribe((dados: Vendedor) => this.populate(dados));
    }
  }

  backPage() {
    this.router.navigate([`comercial/vendedor/lista`]);
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) {
      return false;
    } else {
      return true;
    }
  }

  populate(dados: any) {
    this.formulario.patchValue(
      {
        id_vendedor: typeof(dados.id_vendedor) !== 'undefined' ? dados.id_vendedor : null,
        id_vendedorstatus: typeof(dados.id_vendedorstatus) !== 'undefined' ? dados.id_vendedorstatus : null,
        id_individuo: typeof(dados.id_individuo) !== 'undefined' ? dados.id_individuo : null,
        nome: typeof(dados.nome) !== 'undefined' ? dados.nome : null,
        apelido: typeof(dados.apelido) !== 'undefined' ? dados.apelido : null,
        email: typeof(dados.email) !== 'undefined' ? dados.email : null,
      }
    );
  }

  onSubmite() {
    const form: any = this.formulario;
    this.bkvendedor.save(form).subscribe((dados: any) => {
      if (dados.status === 'success') {
        this.backPage();
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
}
