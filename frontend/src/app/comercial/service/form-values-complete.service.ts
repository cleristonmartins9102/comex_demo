import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Address } from 'src/app/config/address';

@Injectable({
  providedIn: 'root'
})
export class FormValuesCompleteService {
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

  getVendedores() {
    return this.http.post(`${this.bk_full_address}/vendedor/lista/all`, '')
    .pipe(
      map((response: any) => response.items)
    );
  }

  getClientes() {
    return this.http.post(`${this.bk_full_address}/empresa/lista/bypapel/cliente`, '')
    .pipe(
      map((response: any) => response.items)
    );
  }

  getCoadjuvantes() {
    return this.http.post(`${this.bk_full_address}/empresa/lista/bypapel/coadjuvante`, '')
    .pipe(
      map((response: any) => response.items)
    );
  }

  getPredicados(): Observable<any> {
    return this.http.post(`${this.bk_full_address}/predicado/lista/all`, '')
    .pipe(
      map((response: any) => response.items)
    );
  }

  getService(service): Observable<any> {
     return this.http.post(`${this.bk_full_address}/${service}/lista/all`, '')
    .pipe(
      map((response: any) => response.items)
    );
  }


  getPredicadosRegime(regime: string): Observable<any> {
    const reg = {
      'regime': regime
    };
    return this.http.post(`${this.bk_full_address}/predicado/lista/byregime`, reg)
    .pipe(take(1));

  }

}
