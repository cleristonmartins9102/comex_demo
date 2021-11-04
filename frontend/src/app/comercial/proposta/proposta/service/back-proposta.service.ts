import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address } from 'src/app/config/address';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class BackPropostaService {
    bk_ip: Object;
    bk_full_ip: string;
    constructor(
      private http: HttpClient,
      private address: Address,
    ) {
      this.bk_ip = this.address.bkAddress();
      this.bk_ip = this.bk_ip[0].ip;
      this.bk_full_ip = `http://${this.bk_ip}/garm/api/proposta`;
    }

    save(model: any) {
      return this.http.post(`${this.bk_full_ip}/save/store`, JSON.stringify(model.value));
    }

    gerarFilhote(idProposta) {
      const id_proposta = {
        'id_proposta': idProposta
      };
      return this.http.post(`${this.bk_full_ip}/exec/filhote`, id_proposta);
    }

    renovar(idProposta) {
      const id_proposta = {
        'id_proposta': idProposta
      };
      return this.http.post(`${this.bk_full_ip}/exec/renovar`, id_proposta);
    }

    versionar(idProposta) {
      const id_proposta = {
        'id_proposta': idProposta
      };
      return this.http.post(`${this.bk_full_ip}/exec/versionar`, id_proposta);
    }

    getProposta(id: string) {
      return this.http.get(`${this.bk_full_ip}/lista/byid/${id}`);
    }

    getPropostasByStatus(status: string) {
      return this.http.get(`${this.bk_full_ip}/lista/bystatus/${status}`);
    }

    getItens(id_proposta: string) {
      return this.http.post(`${this.bk_full_ip}/lista/itens`, {teste: id_proposta});
    }

    getPropostaById(): Observable<any> {
      return this.http.post(`${this.bk_full_ip}/lista/alldropdown`, '')
     .pipe(
       map((response: any) => response.items)
     );
    }

    getPropostaByRegime(reg: string): Observable<any> {
      const regime = {
        'regime': reg
      };
      return this.http.post(`${this.bk_full_ip}/lista/byregime`, regime)
     .pipe(take(1));
    }

    getPropostaByRegimeAndTerminal(reg: string, terminal: number[]): Observable<any> {
      const regime = {
        'regime': reg,
        'terminal': terminal
      };
      return this.http.post(`${this.bk_full_ip}/lista/byregter`, regime)
     .pipe(take(1));
    }

    getPropostaServicos(id_proposta: number) {
      const id = {
        id_proposta: id_proposta
      };
      return this.http.post(`${this.bk_full_ip}/lista/servico`, id)
      .pipe(
        map((dados: {items}) => dados.items)
      );
    }
}
