import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address } from 'src/app/config/address';
import { Item } from 'src/app/financeiro/fatura/form/espelhos/nota-agenciamento/sub-form/item/Model/item.model';

@Injectable({
  providedIn: 'root'
})
export class CheckPredicadoService {
  bk_ip: any;
  bk_full_address: string;
  constructor(
    private http: HttpClient,
    private address: Address
  ) {
    this.bk_ip = this.address.bkAddress();
    this.bk_ip = this.bk_ip[0].ip;
    this.bk_full_address = `http://${this.bk_ip}/garm/api/predicado/lista`;
  }

  checkFoundPredicado(predicadoNome: String) {
    return this.http.post(`${this.bk_full_address}/bynome`, predicadoNome);
  }

  getDescricaoItem(item: any, itens: [any]) {
    if (typeof (itens) !== 'undefined') {
      const id_predicado = item.value;
      const itemCurrent = itens.filter((data: Item) => data.id_predicado === id_predicado);
      const descricao = typeof (itemCurrent) !== 'undefined' && itemCurrent.length > 0 ? itemCurrent[0].descricao : null;
      return descricao;
    }
  }
}
