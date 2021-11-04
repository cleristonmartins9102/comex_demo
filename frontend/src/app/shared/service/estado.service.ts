import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Address } from 'src/app/config/address';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class EstadoService {
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

  getEstado() {
    return this.http.post(`${this.bk_full_address}/estado/lista/all`, '')
    .pipe(
      map((response: any) => response.items)
    );
  }
}
