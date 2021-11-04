import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-proposta',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemPropostaComponent implements OnInit {
  @Input('depots') depots: any;
  @Input('margens') margens: any;
  @Input('appValor') appValor: any;
  @Input('predicados') listaPredicados: any;
  // @Input('formulario') formulario: any;
  formulario: any;
  @Input('idx') idx: any;
  @Input('data') data;
  @Input('remove') remove: Function;
  @Output('outItem') outItem = new EventEmitter;
  @Input('formEdit') formEdit = false;
  isDevolucao: boolean = false;
  estados: any;
  bagOfAllMargens: any;

  constructor(
    private formBuild: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      id_propostapredicado: new FormControl(this.data.id_propostapredicado),
      id_predicado: new FormControl(this.data.id_predicado),
      id_margem: new FormControl(this.data.id_margem),
      id_depot: new FormControl(this.data.id_depot),
      id_cidade: new FormControl(this.data.id_cidade),
      nome: new FormControl(this.data.id_predicado, Validators.required),
      descricao: new FormControl(this.data.descricao),
      unidade: new FormControl(this.data.unidade, Validators.required),
      valor: new FormControl(this.data.valor, [Validators.required, Validators.minLength(1)]),
      aplicacao_valor: new FormControl(this.data.id_predproappvalor, [Validators.required]),
      franquia_periodo: new FormControl(this.data.franquia_periodo),
      valor_minimo: new FormControl(this.data.valor_minimo),
      valor_maximo: new FormControl(this.data.valor_maximo),
      valor_partir: new FormControl(this.data.valor_partir),
      tipo_valor: new FormControl(this.data.valor === 'sc' ? true : false),
      dimensao: new FormControl(this.data.dimensao),
    })

    this.formulario.get('id_depot').valueChanges.subscribe((id_margem: string) => this.depotChanged(id_margem))
  }

  ngOnChanges(changed): void {
    if ( typeof changed.listaPredicados !== 'undefined') {
      if ( typeof changed.listaPredicados.currentValue !== 'undefined' ) this.formulario.get('id_predicado').setValue(this.data.id_predicado);
    }
    if (typeof this.margens !== 'undefined')
      this.bagOfAllMargens = [...this.margens];
    this.showRegiao();
  }


  removePredicado(idx) {
    this.remove(idx);
  }

  ngAfterContentInit(): void {
    this.emitForm();
  }

  show() {
    console.log(this.formulario);
  }

  depotChanged(id_margem: string) {
    const depotMargem = this.getDepotMargem();
    this.changeData(null, true);
    this.margens = this.bagOfAllMargens;
    if (depotMargem && depotMargem !== 'ambas') {
      this.margemFilter(depotMargem);
    }
    // this.setDescricaoPredicado()

    const cidade = this.getDepotCidade();
    if (typeof cidade.id_cidade === 'undefined' && cidade.id_cidade == null)
      return;

    this.changeData(cidade);
  }

  /**
   * Metodo acionado após a margem ser
   */
  margemChanged() {

  }


  changeData(cidade = null, reset = false) {
    const data = Object.assign({}, this.data);
    if (reset) {
      data.id_estado = null;
      data.id_cidade = null;
      this.data = data;
    } else {
      data.id_estado = cidade.id_estado;
      data.id_cidade = cidade.id_cidade;
    }
    this.data = data;
  }
  /**
   * Metodo que filtra a lista de margens, deixando apenas a margem ao qual o depot é cadastrado
   * @param depotMargem Nome da margem que vai ser comparada.
  */
  margemFilter(depotMargem: string) {
    this.margens = this.bagOfAllMargens.filter((margem: { margem: string }) => margem.margem === depotMargem);
  }

  isLockedRegiao() {
    return this.formulario.get('id_depot').value !== null;
  }

  /**
   * Metodo para buscar a cidade do depot
   */
  getDepotCidade(): { id_cidade: string, id_estado: string } | null {
    const id_depot = this.formulario.get('id_depot').value
    const depot = this.depots.filter(depot => depot.id_depot === id_depot);
    if (depot.length === 1)
      return depot[0];
    return null;
  }
  /**
   * Metodo para buscar a cidade do depot
   */
  getDepotMargem(): string | null {
    const id_depot = this.formulario.get('id_depot').value
    const depot = this.depots.filter(depot => depot.id_depot === id_depot);
    if (depot.length === 1)
      return depot[0].margem;
    return null;
  }

  inCidade(cidade: FormControl): void {
    this.formulario.setControl('id_cidade', cidade);
  }

  emitForm() {
    this.outItem.emit(this.formulario);
  }

  /**
   * Metodo
   * @return void
   */
  showRegiao(): boolean {
    if (typeof this.formulario === 'undefined') return;
    const idx_predicado = this.formulario.get('nome').value;
    this.isDevolucao = this.checkIsServicoDevolucao(this.getPredicadoCurrent(idx_predicado));
    return this.isDevolucao;
  }


  /** 
   * Metodo para contatenar a descrição do predicado com a cidade do depot
   */
  setDescricaoPredicado() {
    const cidade = this.getDepotCidade();
    const margem = (this.getDepotMargem() === 'ambas')
      ? (`margem ${this.getDepotMargem()}`)
      : 'ambas as margens';
    const predicado = this.formulario.get('descricao');
    let descricao = predicado.value;
    // console.log(descricao.indexOf('- ('))
    descricao = descricao.slice(0, descricao.indexOf(' - ('));
    // console.log(descricao.indexOf('- ('));
    predicado.setValue(
      `${descricao} - (${cidade} ${margem})`
    )
  }


  inCidadeNameSelectec(evento) {
    const form = this.formulario.get('descricao');
    let descricao = form.value;
    descricao = descricao.slice(0, descricao.indexOf(' - ('));
    // console.log(descricao.indexOf('- ('));
    // form.setValue(
    //   `${descricao} - (${cidade} ${margem})`
    // )    form.setValue(predicadoCurrent[0].nome);

  }


  selecionarDescricaoPredicado(value: string, idx: string) {
    const predicadoCurrent = this.listaPredicados.filter(el => el.id_predicado === value);
    let form = this.formulario.get('descricao');
    form.setValue(predicadoCurrent[0].nome);
    this.showRegiao();
  }

  /**
   * Metodo para buscar o predicado pelo id_predicado na lista de todos os predicados disponiveis (Não os predicados do array)
   * @param idx 
   */
  private getPredicadoCurrent(idx: string) {
    if (typeof this.listaPredicados === 'object' && this.listaPredicados.length > 0) return this.listaPredicados.filter(el => el.id_predicado === idx);
    return [];
  }

  setValSobConsulta(idx: string) {
    // console.log(this.data)
    const ctrlValor = (<FormControl>this.formulario.get('valor'));
    const tipo_valor = (<FormControl>this.formulario.get('tipo_valor'));
    if (tipo_valor.value) {
      ctrlValor.setValue('sc');
    } else {
      ctrlValor.setValue(0);
    }
  }

  /**
   * Metodo para fazer a verificação se o predicado selecionado é do tipo de serviço devolução
   * Essa checagem é feita para ativar o campo DEPOT
   * @param predicado predicado selecionado  
   */
  private checkIsServicoDevolucao(predicado: any[]) {
    if (predicado.length > 0) {
      const p = predicado[0];
      return (
        (
          p.nome.indexOf('REDEX') !== -1 
        ) &&
        p.servico === 'Pacote' &&
        p.regime === 'exportacao'
      );
    }
  }
}
