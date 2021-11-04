import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BackEndFormDespacho {
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
    return this.http.post(`${this.bk_full_address}/despacho/save/store`, JSON.stringify(formulario.value));
  }

  getDespachoById(id: string) {
    return this.http.get(`${this.bk_full_address}/despacho/lista/byid/${id}`);
  }

  getAllDropDown() {
    return this.http.post(`${this.bk_full_address}/despacho/lista/alldropdown`, '')
    .pipe(take(1));
  }
}
