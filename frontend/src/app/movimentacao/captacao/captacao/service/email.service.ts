import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';

@Injectable()
export class EmailCaptacaoService {
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

  getBody(tipo: string, id_captacao: string) {
    return new Promise((resolve, reject) => {
      const teste = {
        id_captacao: id_captacao,
        bodyName: tipo
      }
      this.http.post(`${this.bk_full_address}/captacao/lista/boem`, JSON.stringify(teste))
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
  }
}