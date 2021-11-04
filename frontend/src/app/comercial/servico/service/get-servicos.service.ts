import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { map, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Item {
  nome: string;
}

@Injectable(
    {
        providedIn: 'root'
    }
)
export class GetServicos {
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

    getPredProAppValue(): Observable<any> {
      return this.http.post(`${this.bk_full_address}/predproappvalue/lista/all`, '')
      .pipe(
          startWith(''),
        map((response: {items}) => response.items)
      );
    }

    getPredicadosAll() {
      return this.http.post(`${this.bk_full_address}/predicado/lista/all`, '')
      .pipe(
        map((dados: {items}) => dados.items)
      );
    }

    getPredicadosById(id: string) {
      const id_predicado = {
        'id': id
      };
      return this.http.post(`${this.bk_full_address}/predicado/lista/byid`, id_predicado)
      .pipe(
        map((dados: {items}) => dados.items)
      );
    }

    getPredicadosByServico(id: string) {
      return this.http.post(`${this.bk_full_address}/predicados/lista/byservico`, id);
    }

    getServicoAll() {
      return this.http.post(`${this.bk_full_address}/servico/lista/all`, '{}')
      .pipe(
        map((response: {items}) => response.items)
      );
    }

    getServicoByNome(nomeServico: string) {
      const servico = {
        'nome': nomeServico
      };
      return this.http.post(`${this.bk_full_address}/servico/lista/bynome`, servico)
      .pipe(
        map((dados: {predicados: any}) => dados.predicados)
        );
    }

    getServicoById(id: string) {
      const id_servico = {
        'id': id
      };
      return this.http.post(`${this.bk_full_address}/servico/lista/byid`, id_servico);
    }

    getServicosCriteria(d) {
      return this.http.post(`${this.bk_full_address}/all`, '');
    }

    getPredicadosRegime(regime: string): Observable<any> {
      const reg = {
        'regime': regime
      };
      return this.http.post(`${this.bk_full_address}/predicado/lista/byregime`, reg)
      .pipe(take(1));
    }
}
