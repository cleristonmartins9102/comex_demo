import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Item {
  nome: string;
}

@Injectable(
    {
        providedIn: 'root'
    }
)
export class GetServicoMaster {
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

    getServicoMaster(id: string): Observable<any> {
      return this.http.post(`${this.bk_full_address}/servicomaster/lista/byid`, id);
    }
}
