import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BackEndFormCaptacao {
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
    return this.http.post(`${this.bk_full_address}/captacao/save/store`, JSON.stringify(formulario.value));
  }

  getCaptacao(id: string) {
    return this.http.get(`${this.bk_full_address}/captacao/lista/byid/${id}`);
  }

  getCaptacaoEmail(id: string) {
    const promise = new Promise((resolve, reject) => {
      const response = this.http.get(`${this.bk_full_address}/captacao/lista/byid/${id}`)
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
    return promise;
  }

  getProposta(id_captacao: string) {
    return this.http.post(`${this.bk_full_address}/captacao/lista/byid/`, id_captacao);

  }

  getMailDestination(id: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
    this.http.get(`${this.bk_full_address}/captacao/lista/mail/${id}`)
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
