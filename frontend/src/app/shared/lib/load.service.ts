import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { FormGroup } from '@angular/forms';

@Injectable()
export class Load {
    private valor?: any;
    private bk_ip?: any;
    private bk_full_address?: string;

    constructor(
        private http?: HttpClient,
        private address?: Address
    ) {
        // this.bk_ip = this.address.bkAddress();
        this.bk_ip = 'back-garm.ddns.net';
        this.bk_full_address = `http://${this.bk_ip}/garm/api`;
    }

    buscar(id: number, application) {
        return this.http.get(`${this.bk_full_address}/${application}/lista/byid/` + id);
    }

}