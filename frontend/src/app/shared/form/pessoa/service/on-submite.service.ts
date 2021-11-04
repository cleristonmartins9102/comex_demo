import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Address } from 'src/app/config/address';

@Injectable({
  providedIn: 'root'
})
export class OnSubmiteService {
  bk_ip: Object;
  bk_full_ip: string;
  constructor(
    private http: HttpClient,
    private address: Address
  ) {
    this.bk_ip = this.address.bkAddress();
    this.bk_ip = this.bk_ip[0].ip;
    this.bk_full_ip = `http://${this.bk_ip}/garm/api/empresa`;
  }

  save(model: any) {
    return this.http.post(`${this.bk_full_ip}/save/store`, JSON.stringify(model.value));
  }
}
