import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

// import { FormDropdownService } from '../service/form-dropdown.service';
// import { BackEndFormLiberacao } from '../service/back-end.service';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { Captacao } from 'src/app/liberacao/liberacao/model/captacao.module';
import { BackEndOperacao } from '../../operacao/service/backEnd.service';
import { BackEndProcessoStatus } from '../service/processo-status-back-end.service';
import { map } from 'rxjs/operators';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { BackEndProcesso } from '../service/back-end.service';
import { BackEndProcessoTipo } from '../service/processo-tipo-back-end.service.1';
import { GetServicoMaster } from 'src/app/comercial/servico/service/get-servico_master.service';
import { BackEndFormCaptacao } from 'src/app/movimentacao/captacao/captacao/service/back-end.service';
import { BackEndFormDespacho } from 'src/app/movimentacao/despacho/service/back-end.service';
import { Item } from 'src/app/shared/model/item.model';
import { AuthService } from 'src/app/login/service/auth.service';
import { BackEndFormCaptacaoLote } from 'src/app/movimentacao/captacao/lote/service/back-end.service';
import { AccessType } from 'src/app/shared/report/security/acess-type';
import { Pessoa } from 'src/app/shared/form/pessoa/model/pessoa.model';
import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';


@Component({
  selector: 'app-form-processo',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormProcessoComponent extends AccessType implements OnInit {
  processosTipo: Observable<any>;
  proposta: Observable<any>;
  statusLista: Observable<any>;
  captacoes: Observable<any>;
  isLote = false;
  isDespacho = false;
  data = {
    data_inicio: '',
    data_final: ''
  };
  forms: any[];
  fornecedores: Pessoa[]
  despachos: any;
  lotes: any
  lotesCollection: any[];
  formulario: FormGroup;
  subFormData: any;
  subFormDataDocumentos: Object;
  formEdit: Boolean;
  propNumVisible: Boolean = true;
  @ViewChild('servicoSelectBtn') servicoSelectBtn: ElementRef<any>;
  @ViewChild('diasConsumoInput') diasConsumoInput: ElementRef<any>;
  subFormClose: Boolean;
  status: Observable<{}>;
  regime: {};
  id_proposta: number;

  constructor(
    private captacaoDropDown: BackEndOperacao,
    private despachoDropDown: BackEndFormDespacho,
    private processoStatus: BackEndProcessoStatus,
    private processoTipo: BackEndProcessoTipo,
    private backEndFormCaptacaoLote: BackEndFormCaptacaoLote,
    private empresaDropDown: GetEmpresaService,
    private cap: BackEndFormCaptacao,
    private sendForm: BackEndProcesso,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerAct: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super('financeiro', 'processo', 'processos');
   }

  ngOnInit() {
    this.forms = [];
    this.captacoes = this.captacaoDropDown.getAllDropDown();
    this.despachoDropDown.getAllDropDown().subscribe(despacho => {
      this.despachos = despacho;
    });
    this.empresaDropDown.getEmpresaPapel('fornecedor').subscribe(empresas => this.fornecedores = empresas)
    this.backEndFormCaptacaoLote.getAll().subscribe(lotes => this.lotes = lotes);
    this.status = this.processoStatus.getAll();
    this.processosTipo = this.processoTipo.getAll();
    this.formulario = this.formBuilder.group({
      id_processo: [null],
      id_captacaolote: [null],
      id_captacao: [null],
      id_despacho: [null],
      id_fornecedor: [null],
      numero: [null],
      mercadoria: [null],
      valor_mercadoria: [null],
      id_liberacao: [null],
      id_status: [null, Validators.required],
      dta_inicio: [null, Validators.required],
      dta_final: [null],
      dias_consumo: [null],
      itens: new FormArray([]),
    });

    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.propNumVisible = true;
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
      this.sendForm.getProcesso(id).subscribe((dados: { locked: boolean }) => {
        this.formEdit = this.isLocked() ? this.isLocked() : dados.locked;
        this.populateForm(this.formulario, dados);
      });
    }
  }

  checkFieldDocumentDirty() {
    if (this.formulario.get('documento').value) {
      return true;
    } else {
      return false;
    }
  }

  getItensPadroes() {
    let operacao = null;
    const valor_mercadoria = this.formulario.get('valor_mercadoria').value;
    const servico_master = 20;
    const dta_inicio = this.formulario.get('dta_inicio').value;
    const dta_final = this.formulario.get('dta_final').value;

    if (dta_inicio !== null && dta_final !== null) {
      this.data.data_inicio = dta_inicio;
      this.data.data_final = dta_final;
      const processos = this.formulario.get('id_processo').value;
      const dta_inicio_dta = new Date(dta_inicio);
      const dta_final_dta = new Date(dta_final);
      const timeDiff = Math.abs(dta_inicio_dta.getTime() - dta_final_dta.getTime());
      const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      if (dta_inicio !== null && dta_final !== null) {
        this.diasConsumoInput.nativeElement.value = dayDifference;
        const total = [];
        this.sendForm.getItensCalculated('processo', valor_mercadoria, dayDifference, servico_master, operacao, dta_inicio_dta, processos).subscribe((itens: any) => {
          this.formulario.removeControl('itens');
          this.formulario.setControl('itens', new FormArray([]));
          this.lotesCollection = itens.all;
        });
      }
    }
  }

  /**
   * Busca os dias consumidos
   * @param act = Variável para decidir se deve buscar os itens padroes ou apenas pegar dias consumo
   */
  getDay(act) {
    const dta_inicio = this.formulario.get('dta_inicio').value;
    const dta_final = this.formulario.get('dta_final').value;

    if (dta_inicio !== null && dta_final !== null) {
      this.data.data_inicio = dta_inicio;
      this.data.data_final = dta_final;

      const dta_inicio_dta = new Date(dta_inicio);
      const dta_final_dta = new Date(dta_final);
      const timeDiff = Math.abs(dta_inicio_dta.getTime() - dta_final_dta.getTime());
      const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      if (dta_inicio !== null && dta_final !== null) {
        this.diasConsumoInput.nativeElement.value = dayDifference;
        if (act) {
          this.getItensPadroes();
        }
      }
    }
  }

  /**
   * Metodo para pegar a quantidade de itens no formulario
   */
  itensLength() {
    const itens = this.formulario.get('itens');
    if ( itens !== null && itens.value.length  > 0 ) {
      return this.formulario.get('itens').value[0].length;
    }
  }

  /**
   * Metodo para apagar os itens que são iguais aos novos recebidos pela caluculadora dos itens padrões e depois concatena
   * @param itens Itens recebidos da api
   * @param return Itens concatenados
   */
  sieveItens(itens: [Item]) {
    const idx_el = [];
    itens.forEach(element => {
      // console.log(element)
      // console.log(this.subFormData)
      this.subFormData.forEach((data, k) => {
        if (data.id_predicado === element.id_predicado) {
          idx_el.push(k);
        }
      });
    });

    if (idx_el.length > 0) {
      idx_el.forEach((idx_item, k) => {
        this.subFormData.splice((idx_item - k), 1);

      });
    }
    return itens.concat(this.subFormData);
  }

  populateForm(formulario: FormGroup, dados: any) {
    this.regime = {
      regime: dados.regime,
      id_regime: dados.id_regime
    };
    this.id_proposta = dados.id_proposta;
    // Populando os dados do formulário
    formulario.patchValue({
      id_processo: dados.id_processo,
      id_captacaolote: dados.id_captacaolote,
      id_captacao: dados.id_captacao,
      id_despacho: dados.id_despacho,
      id_fornecedor: dados.id_fornecedor,
      dias_consumo: dados.dias_consumo,
      numero: dados.numero,
      valor_mercadoria: dados.valor_mercadoria,
      mercadoria: dados.mercadoria,
      id_status: dados.id_processostatus,
      dta_inicio: typeof (dados.dta_inicio) !== 'undefined' && dados.dta_inicio !== null ? dados.dta_inicio + 'T03:00:00.000Z' : null,
      dta_final: typeof (dados.dta_final) !== 'undefined' && dados.dta_final !== null ? dados.dta_final + 'T03:00:00.000Z' : null,
    });
    if (dados.id_captacaolote) {
      this.formulario.get('valor_mercadoria').disable();
    }
    this.isLote = dados.isLote;
    this.isDespacho = dados.isDespacho;
    this.lotesCollection = dados.itens.all;

    // this.subFormData = dados.itens;
    this.getDay(false);
  }

  getProcessoData() {
    const processo_data = {
      valor_mercadoria: this.formulario.get('valor_mercadoria'),
      dias_consumo: this.diasConsumoInput,
      predicado: this.formulario.get('id_predicado'),
      captacao: this.formulario.get('id_captacao'),
    };
    return processo_data;
  }

  getSubFormDocumentos(subForm: FormGroup, data: any) {
    subForm.patchValue({
      tipo: parseInt(data.id_tipodocumento),
      id_documento: parseInt(data.id_upload),
      file_name: data.nome_original,
    });
    return subForm;
  }

  getProposta(event: any) {
    const id_captacao = event.value;
    this.cap.getCaptacao(id_captacao)
      .subscribe((dados: any) => {
        this.proposta = dados.items[0].id_proposta;
      });
  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) return false;
    return true;
  }

  receiveForm(event: FormArray) {
    const form = this.formulario;
    this.forms.push(event);
    // Criando controller anexos
    // form.setControl('itens', new FormArray([this.forms]));
  }

  receivedDataSubFormContainer(event) {
    this.formulario.addControl('container', event);
    // Removendo os containeres, pois a principio não é obrigatório a sua existencia
    // this.cleanSubForm();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Processo salvo com sucesso!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (this.formEdit) {
        this.backPage();
      // }
    });
  }

  /**
   * Verifica se é um despacho
   */
  // isDespacho(): boolean {
  //   return this.formulario.get('id_despacho').value ? true : false;
  // }

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
    let arrLenContainer: any = form.controls['itens'].value.length;
    // Removendo os campos dos container
    while (arrLenContainer >= 0) {
      form.get('itens').removeAt(arrLenContainer);
      arrLenContainer--;
    }    
  }

  backPage() {
    this.router.navigate(['/financeiro/processo/lista']);
  }

  onSubmite() {
    this.sendForm.save(this.formulario).subscribe((dados: { status }) => {
      if (dados.status === 'success') {
        this.subFormClose = false;
        // if (!this.formEdit) {
        //   this.cleanForm();
        // }
        this.openDialog();
      }
    });
  }
}
