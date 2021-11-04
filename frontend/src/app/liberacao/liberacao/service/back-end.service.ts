import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackEndFormLiberacao {
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
    return this.http.post(`${this.bk_full_address}/liberacao/save/store`, JSON.stringify(formulario.value));
  }

  generate(id_captacao: number) {
    const captacao = { id_captacao: id_captacao};
    return this.http.post(`${this.bk_full_address}/liberacao/save/store`, JSON.stringify(captacao));
  }

  getLiberacao(liberacao: string) {
    return this.http.get(`${this.bk_full_address}/liberacao/lista/byid/${liberacao}`);
  }

  getLiberacaoEmail(id: string) {
    const promise = new Promise((resolve, reject) => {
      const response = this.http.get(`${this.bk_full_address}/liberacao/lista/byid/${id}`)
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
    return promise;
  }

  getMailDestination(id: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
    this.http.get(`${this.bk_full_address}/liberacao/lista/mail/${id}`)
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
