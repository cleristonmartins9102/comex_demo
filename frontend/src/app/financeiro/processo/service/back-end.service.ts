import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BackEndProcesso {
  valor: any;
  bk_ip: any;
  bk_full_address: string;

  constructor(
    private http: HttpClient,
    private address: Address
  ) {
    this.bk_ip = this.address.bkAddress();
    this.bk_ip = this.bk_ip[0].ip;
    this.bk_full_address = `http://${this.bk_ip}/garm/api`;
  }

  save(formulario: FormGroup) {
    return this.http.post(`${this.bk_full_address}/processo/save/store`, JSON.stringify(formulario.value));
  }

  generate(instruction: any) {
    return this.http.post(`${this.bk_full_address}/processo/save/store`, instruction);
  }

  getProcesso(id: string) {
    return this.http.get(`${this.bk_full_address}/processo/lista/byid/${id}`);
  }

  getProcessoAllDropDown() {
    return this.http.post(`${this.bk_full_address}/processo/lista/alldropdown`, '');
  }

  getItensCalculated(module, valor_mercadoria: string, dias_consumo: number, servico_master: number, regime: string, data_inicio: Date, processo = null) {

    const send = {
      valor_mercadoria: valor_mercadoria,
      dta_inicio: data_inicio,
      dias_consumo: dias_consumo,
      servico_master: servico_master,
      regime: regime,
      modulo: module,
      processo: processo
    };
    return this.http.post(`${this.bk_full_address}/itempadrao/lista/byoperacao`, JSON.stringify(send));
  }

  getValorItem(valor: string, id_processopredicado: string, qtd: number, periodo: number) {
    const send = {
      id_processopredicado: id_processopredicado,
      valor: valor,
      qtd: qtd,
      periodo: periodo
    };
    return this.http.post(`${this.bk_full_address}/fatura/calc/item`, JSON.stringify(send));
  }

    /**
   * Metodo que busca o periodo do servico
   * @param id_processo Id do processo
   * @param id_predicado  ID do item
   * @param dimensao  Dimensão do container
   * @param dta_entrada  Data de entrada no item
   * @param dta_final Data de Saída no Item
   */
  servicoPeriodo(id_processo: string, id_predicado: string, dimensao: string, dta_entrada: string, dta_final: string) {
    const data = {
      id_processo: id_processo,
      id_predicado: id_predicado,
      dimensao: dimensao,
      dta_entrada: dta_entrada,
      dta_final: dta_final
    }
    return this.http.post(`${this.bk_full_address}/proposta/ser/periodo`, data);
  }


  getItemNecessarioData(processo) {
    return this.http.post(`${this.bk_full_address}/processo/serdep/find`, JSON.stringify(processo));
  }
}
