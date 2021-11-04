import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { map } from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class BackEndPorto {
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

    getPortoAll() {
        return this.http.post(`${this.bk_full_address}/porto/lista/all`, '')
        .pipe(
          map((response: any) => response.items)
        );
      }
}
