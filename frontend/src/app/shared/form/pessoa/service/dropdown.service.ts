import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Estados } from '../../../model/estados-br.model';
import { Cidades } from '../../../model/cidades-br.model';
import { Address } from 'src/app/config/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DropdownService {
  bk_ip: Object;
  bk_full_address_estados: string;
  bk_full_address_cidades: string;
  estadoUrl = 'http://back/garm/api/estado/lista';
  cidadeUrl = 'http://back/garm/api/cidade/lista/byid';
  estados: Observable<any>;

  constructor(
    private http: HttpClient,
    private address: Address
  ) {
    this.bk_ip = this.address.bkAddress();
    this.bk_full_address_estados = `http://${this.bk_ip[0].ip}/garm/api/estado/lista`;
    this.bk_full_address_cidades = `http://${this.bk_ip[0].ip}/garm/api/cidade/lista/byid`;
  }

  getEstados() {
      this.estados = this.http.post<Estados[]>(`${this.bk_full_address_estados}/all`, '')
        .pipe(
          map((response: any) => response.items)
        );

    return this.estados;
  }

  getCidades(id_estado: number) {
    return this.http.get<Cidades[]>(`${this.bk_full_address_cidades}/${id_estado}`);
  }
}
