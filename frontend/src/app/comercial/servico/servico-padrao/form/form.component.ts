import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Vendedor } from './model/vendedor.model';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { DialogComponent } from 'src/app/shared/upload/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { Predicado } from '../../servico/form-servico/model/predicado.model';
import { GetServicos } from '../../service/get-servicos.service';
import { UnidadeCobrancaService } from 'src/app/shared/service/unidade-cobranca.service';
import { BackendService } from 'src/app/shared/service/backend.service';
import { ItemPadraoService } from '../service/backend.service';

@Component({
  selector: 'app-form-item-padrao',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class ItemPadraoFormComponent implements OnInit {
  predicados: Predicado[];
  uniCobs: any;
  itemClassificoes: any;

  formulario: FormGroup;
  vendedor: Observable<Vendedor>;
  formEdit: boolean;
  pessoas: any;

  constructor(
    private formBuilder: FormBuilder,
    private routerAct: ActivatedRoute,
    private getServicos: GetServicos,
    private backendService: BackendService,
    private itemPadraoService: ItemPadraoService,
    private unidadeCobrancaService: UnidadeCobrancaService,
    private router: Router,
    private dialog: MatDialog,
    private getEmpresaService: GetEmpresaService
  ) { }

  ngOnInit() {
    const modulo = ((this.routerAct as any)._routerState.snapshot.url).includes('comercial') ? 4 : 3;
    this.getServicos.getPredicadosAll().subscribe( predicados => this.predicados = predicados );
    this.unidadeCobrancaService.getAllDropDown().subscribe( uniCobs => this.uniCobs = uniCobs );
    this.backendService.getItemClassificacaoAll().subscribe( itemClassificacao => this.itemClassificoes = itemClassificacao )

    this.getEmpresaService.getEmpresaPapel('colaborador').subscribe( colaboradores => this.pessoas = colaboradores);
    this.formulario = this.formBuilder.group({
      id_itempadrao: [null],
      id_predicado: [null, Validators.required],
      id_predproappvalor: [null],
      id_itemclassificacao: [null, Validators.required],
      id_modulo: [`${modulo}`, Validators.required],
      id_unicob: [null],
      valor: [null],
      prioridade: [null, Validators.required],
    });

    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = true;
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
        this.itemPadraoService.getById(id).subscribe((dados: any) => this.populate(dados));
    }
  }

  backPage() {
    if (this.formulario.get('id_modulo').value === '3') {
      this.router.navigate([`financeiro/itempadrao/lista`]);
    } else {
      this.router.navigate([`comercial/servico/itempadrao/lista`]);
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

  populate(dados: any) {
    dados = dados[0];
    this.formulario.patchValue(
      {
        id_itempadrao: typeof(dados.id_itempadrao) !== 'undefined' ? dados.id_itempadrao : null,
        id_predicado: typeof(dados.id_predicado) !== 'undefined' ? dados.id_predicado : null,
        id_predproappvalor: typeof(dados.id_predproappvalor) !== 'undefined' ? dados.id_predproappvalor : null,
        id_itemclassificacao: typeof(dados.id_itemclassificacao) !== 'undefined' ? dados.id_itemclassificacao : null,
        id_modulo: typeof(dados.id_modulo) !== 'undefined' ? dados.id_modulo : null,
        id_unicob: typeof(dados.id_unicob) !== 'undefined' ? dados.id_unicob : null,
        valor: typeof(dados.valor) !== 'undefined' ? dados.valor : null,
        prioridade: typeof(dados.prioridade) !== 'undefined' ? dados.prioridade : null,
      }
    );
  }

  onSubmite() {
    const form: any = this.formulario;
    this.itemPadraoService.save(form).subscribe((dados: any) => {
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
