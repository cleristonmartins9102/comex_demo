import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable()
export class VendedorService {
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

    getAllDropDown() {
      return this.http.post(`${this.bk_full_address}/vendedor/lista/alldropdown`, '')
      .pipe(
        map((response: any) => response.items)
      );
    }

    getById(id: string): Observable<any> {
      const id_vendedor = {
        'id': id
      };
      return this.http.post(`${this.bk_full_address}/vendedor/lista/byid`, id_vendedor);
    }

    getVendedorStatus() {
      return this.http.post(`${this.bk_full_address}/vendedorstatus/lista/alldropdown`, '');
    }

    save(formulario: FormGroup) {
      return this.http.post(`${this.bk_full_address}/vendedor/save/store`, JSON.stringify(formulario.value));
    }
}
