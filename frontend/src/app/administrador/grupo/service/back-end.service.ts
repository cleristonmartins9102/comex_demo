import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';
import { GrupoAcesso } from '../model/grupo-acesso.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
    valor: any;
    bk_ip: any;
    bk_full_address: string;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

    constructor(
      private http: HttpClient,
      private address: Address
    ) {
      this.bk_ip = this.address.bkAddress();
      this.bk_ip = this.bk_ip[0].ip;
      this.bk_full_address = `http://${this.bk_ip}/garm/api`;
    }

    get allGrupos(): Observable<GrupoAcesso> {
      return this.http.post<GrupoAcesso>(`${this.bk_full_address}/grupoacesso/lista/all`, '').pipe(take(1));
    }

    save(formulario: {}) {
      // console.log(JSON.stringify(formulario));
      return this.http.post(`${this.bk_full_address}/grupoacesso/save/store`, JSON.stringify(formulario)).pipe(take(1));
    }
}
