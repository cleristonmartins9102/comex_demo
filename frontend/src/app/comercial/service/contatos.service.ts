import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address } from 'src/app/config/address';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ContatoService {
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

    getContato(model) {
        return this.http.post(`${this.bk_full_address}/contato/lista/byid`, model.value);
    }
}
