import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BackEndFaturaStatus {
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

  getAll() {
    return this.http.post(`${this.bk_full_address}/faturastatus/lista/alldropdown`, '');
  }
}
