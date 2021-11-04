import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Injectable()
export class MoedaService {
    valor: any;
    bk_ip: any;
    bk_full_address: string;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/text' }) };


    constructor(
        private http: HttpClient,
        private address: Address
    ) {
        this.bk_ip = this.address.bkAddress();
        this.bk_ip = this.bk_ip[0].ip;
        this.bk_full_address = `http://${this.bk_ip}/garm/api`;
    }

    alldropdown() {
        return this.http.post(`${this.bk_full_address}/moeda/lista/alldropdown`, '')
        .pipe(take(1));
    }

}