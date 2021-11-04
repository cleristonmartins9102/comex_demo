import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';

@Injectable()
export class EmailFaturaService {
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

  getBody(tipo: string, id_fatura: string) {
    return new Promise((resolve, reject) => {
      const teste = {
        id_fatura: id_fatura,
        bodyName: tipo
      }
      this.http.post(`${this.bk_full_address}/fatura/lista/boem`, JSON.stringify(teste))
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
  }
}