import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ComissionarioService {
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

    getComissionarioTipo() {
      return this.http.post(`${this.bk_full_address}/comissionariotipo/lista/all`, '');
    }

    getComissionarioStatus() {
      return this.http.post(`${this.bk_full_address}/comissionariostatus/lista/all`, '');
    }

    /**
     * Metodo para buscar as aplicações de cobrança dos comissionarios
     */
    get appCobAllDropDown() {
      return this.http.post(`${this.bk_full_address}/comissionarioappcob/lista/alldropdown`, '')
      .pipe(map( ( el: { items } ) => el.items))
    }

    getById(id: string): Observable<any> {
      const id_comissionario = {
        'id': id
      };
      return this.http.post(`${this.bk_full_address}/comissionario/lista/byid`, id_comissionario);
    }

    save(formulario: FormGroup) {
      return this.http.post(`${this.bk_full_address}/comissionario/save/store`, JSON.stringify(formulario.value));
    }
}
