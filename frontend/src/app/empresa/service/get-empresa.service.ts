import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

import { Address } from 'src/app/config/address';

@Injectable({
  providedIn: 'root'
})

export class GetEmpresaService {
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

   getEmpresaAll() {
     return this.http.post(`${this.bk_full_address}/empresa/lista/all`, '')
     .pipe(
       map((response: any) => response.items)
     );
   }

   getEmpresaById(id: any) {
     return this.http.post(`${this.bk_full_address}/empresa/lista/byid`, {'id_individuo': id});
   }

   getEmpresaCriteria(criteria: any) {
     return this.http.post(`${this.bk_full_address}/filtered`, JSON.stringify(criteria));
   }

   getEmpresaPapel(papel: string | string[]) {
    return this.http.post(`${this.bk_full_address}/empresa/lista/bypapel`, JSON.stringify({'papeis': papel}))
    .pipe(
      take(1),
      map((response: any) => response.items)
    );
  }
}
