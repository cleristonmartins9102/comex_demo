import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BackEndFatura {
  valor: any;
  bk_ip: any;
  bk_full_address: string;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/text'})};


  constructor(
    private http: HttpClient,
    private address: Address
  ) {
    this.bk_ip = this.address.bkAddress();
    this.bk_ip = this.bk_ip[0].ip;
    this.bk_full_address = `http://${this.bk_ip}/garm/api`;
  }

  save(formulario: FormGroup) {
    return this.http.post(`${this.bk_full_address}/fatura/save/store`, JSON.stringify(formulario.value));
  }

  /**
   * Metodo para gerar fatura complementar a partir de uma fatura cheia
   * @param id_fatura Id da fatura ao qual vai ser gerado a complementar
   */
  gerarComplementar(id_fatura: string) {
    const fatura = {
      id_fatura: id_fatura
    }
    return this.http.post(`${this.bk_full_address}/fatura/save/complementar`, fatura);
  }

  /**
   * Metodo para gerar liberar o processo para que possa ser alteravel e passivel de gerar faturas complementares
   * @param id_fatura Id da fatura ao qual vai ser liberado
   */
  liberarComplementar(id_fatura: string) {
    const fatura = {
      id_fatura: id_fatura
    }    
    return this.http.post(`${this.bk_full_address}/fatura/save/liberarcheia`, fatura); 
  }

  /**
   * Metodo que gera fatura a partir do processo
   * @param id_processo id do processo ao qual vai ser referencia para gerar a fatura
   */
  generate(id_processo: string) {
    return this.http.post(`${this.bk_full_address}/fatura/save/store`, id_processo);
  }

  getProcesso(id: string) {
    return this.http.get(`${this.bk_full_address}/processo/lista/byid/${id}`);
  }

  getProcessoAllDropDown() {
    return this.http.post(`${this.bk_full_address}/processo/lista/alldropdown`, '');
  }

  getFaturaById(id: string) {
    return this.http.post(`${this.bk_full_address}/fatura/lista/byid`, id, this.httpOptions);
  }

  getFaturaAll() {
    return this.http.get(`${this.bk_full_address}/fatura/lista/all`);
  }

  recalcular(id_fatura: number) {
    const fatura = {
      id_fatura: id_fatura
    }
    return this.http.post(`${this.bk_full_address}/fatura/recalcular/total`, fatura).subscribe( d => console.log(d));
  }

  calcTotal(id_fatura, valorTotal, valorCusto) {
    const valores = {
      id_fatura: id_fatura,
      valorTotal: valorTotal,
      valorCusto: valorCusto
    };
    return this.http.post(`${this.bk_full_address}/fatura/calc/total`, JSON.stringify(valores));
  }

  getFaturaModeloAllDropDown() {
    return this.http.post(`${this.bk_full_address}/faturamodelo/lista/alldropdown`, '');
  }

  getMailDestination(id: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
    this.http.get(`${this.bk_full_address}/fatura/lista/mail/${id}`)
            .pipe(take(1))
            .toPromise()
            .then(
              res => {
                resolve(res);
              }
            );
    });
    return promise;
  }
}
