import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ComissionarioService } from '../service/backend.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSelect, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { VendedorService } from '../../vendedor/vendedor/service/backend.service';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { UnidadeCobrancaService } from 'src/app/shared/service/unidade-cobranca.service';
import { AccessType } from 'src/app/shared/report/security/acess-type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComissionarioComponent extends AccessType implements OnInit {
  comissaoMask: any;
  unidadeCobranca: any;
  appCobs: {}[];
  comissionarioTipo: any;
  comissionarioStatus: any;
  comissionarios: any;
  formulario: FormGroup;
  clienteFaturaOn: boolean = false;
  clientesFaturas: any;
  formEdit: boolean = false;
  @ViewChild('uniCob') uniCob: MatSelect;
  @ViewChild('comissionarioT') comissionarioT: MatSelect;

  myModel = {
    percentNumber: null
  }
  constructor(
    private comissionarioService: ComissionarioService,
    private formBuilder: FormBuilder,
    private vendedorService: VendedorService,
    private empresaDropDown: GetEmpresaService,
    private router: Router,
    private unidadeCobrancaService: UnidadeCobrancaService,
    private routerAct: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    super('comercial', 'comissionario', 'comissionários');
  }

  ngOnInit() {
    this.comissionarioService.getComissionarioTipo().subscribe(comissionarios => this.comissionarioTipo = comissionarios);
    this.comissionarioService.getComissionarioStatus().subscribe(status => this.comissionarioStatus = status);
    this.unidadeCobrancaService.getAllDropDown().subscribe(unicob => this.unidadeCobranca = unicob);
    this.comissionarioService.appCobAllDropDown.subscribe(appCob => this.appCobs = appCob);
    this.formulario = this.formBuilder.group({
      id_comissionario: [null],
      id_comissionado: [null, Validators.required],
      id_clientefatura: [null],
      id_unicob: [null, Validators.required],
      id_comissionariotipo: [null, Validators.required],
      id_comissionariostatus: [null, Validators.required],
      valor_comissao: [null, Validators.required]
    });

    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = this.isLocked();
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
      this.comissionarioService.getById(id).subscribe((dados: any) => this.populateForm(dados));
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

  populateForm(dados: any) {
    this.formulario.patchValue({
      id_comissionario: typeof (dados.id_comissionario) !== 'undefined' ? dados.id_comissionario : null,
      id_comissionado: typeof (dados.id_comissionado) !== 'undefined' ? dados.id_comissionado : null,
      id_unicob: typeof (dados.id_unicob) !== 'undefined' ? dados.id_unicob : null,
      id_clientefatura: typeof (dados.id_clientefatura) !== 'undefined' ? dados.id_clientefatura : null,
      id_comissionariotipo: typeof (dados.id_comissionariotipo) !== 'undefined' ? dados.id_comissionariotipo : null,
      id_comissionariostatus: typeof (dados.id_comissionariostatus) !== 'undefined' ? dados.id_comissionariostatus : null,
      valor_comissao: typeof (dados.valor_comissao) !== 'undefined' ? dados.valor_comissao : null,
    });
    this.getComissionarios();
    this.uniCobMask();
    if (dados.id_comissionarioappcob) {
      this.formulario.get('appcob').setValue(dados.id_comissionarioappcob);
    }
  }


  cleanForm() {
    const form: any = this.formulario;
    form.reset();
    // Object.keys(form.controls).forEach((v, k) => {
    //   form.controls[v].setErrors(null);
    // });
    this.backPage();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Comissionário salvo com sucesso!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.backPage();
    });
  }

  uniCobMask() {
    switch (this.uniCob.triggerValue) {
      case 'Moeda':
        this.comissaoMask = "moeda";
        this.setControlAppCob();
        break;

      case '% Valor':
        this.comissaoMask = "porcentagem";
        this.remControlAppCob();
        break;

      default:
        break;
    }
  }

  setControlAppCob() {
    this.formulario.setControl('appcob', new FormControl('', Validators.required))
  }

  remControlAppCob() {
    this.formulario.removeControl('appcob');
  }

  backPage() {
    this.router.navigate(['/comercial/comissionario/lista']);
  }

  // openSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     duration: 3000
  //   });
  // }

  onSubmite() {
    this.comissionarioService.save(this.formulario).subscribe((dados: any) => {
      if (dados.status === 'success') {
        if (!this.formEdit) {
          this.cleanForm();
        }
        this.openDialog();
      } else if (!dados.status) {
        // this.openSnackBar(dados.message.charAt(0).toUpperCase() + dados.message.slice(1), '');
      }
    });
  }
  
  getComissionarios() {
    switch (this.comissionarioT.triggerValue) {
      case 'Vendedor':
        this.getVendedores();
        this.clienteFaturaOn = false;
        break;

      case 'Despachante':
        this.getPessoa('despachante');
        this.clienteFaturaOn = true;
        break;

      case 'Agênte De Carga':        
        this.getPessoa('agênte de carga');
        this.clienteFaturaOn = true;
        break;

      default:
        break;
    }
  }

  private getVendedores() {
    this.vendedorService.getAllDropDown().subscribe(vendedores => {
      this.comissionarios = vendedores
    });
  }

  private getPessoa(papel: string) {
    this.empresaDropDown.getEmpresaPapel(papel).subscribe(empresas => {
      this.comissionarios = empresas
    });
    this.getClienteFatura();
  }

  private getClienteFatura() {
    const papeis = [
      'importador',
      'exportador',
      'cliente'
    ]
    this.empresaDropDown.getEmpresaPapel(papeis).subscribe(clientes => this.clientesFaturas = clientes);
  }

}
