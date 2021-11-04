import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { Address } from 'src/app/config/address';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class TerminalBackEndService {
    bk_ip: Object;
    bk_full_ip: string;
    constructor(
      private http: HttpClient,
      private address: Address,
    ) {
      this.bk_ip = this.address.bkAddress();
      this.bk_ip = this.bk_ip[0].ip;
      this.bk_full_ip = `http://${this.bk_ip}/garm/api/cext`;
    }

    save(model: FormGroup) {
      return this.http.post(`${this.bk_full_ip}/save/store`, JSON.stringify(model.value));
    }

    getAll() {
      return this.http.post(`${this.bk_full_ip}/lista/all`, '')
      .pipe(
        map((response: {items}) => response.items)
      );
    }

    getById(id: string) {
      console.log(22222);
      
      return this.http.post(`${this.bk_full_ip}/lista/byid`, id);
    }
}
