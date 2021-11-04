import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

import { Address } from 'src/app/config/address';

@Injectable()
export class SendEmailService {
    private bk_ip: any;
    private bk_full_address: string;

    constructor(
      private http: HttpClient,
      private address: Address
    ) {
      this.bk_ip = this.address.bkAddress();
      this.bk_ip = this.bk_ip[0].ip;
      this.bk_full_address = `http://${this.bk_ip}/garm/api`;
    }

    send(formulario: FormGroup, link: string) {
        return this.http.post(`${this.bk_full_address}/${link}`, JSON.stringify(formulario.value))
                .pipe(take(1));
    }
}
