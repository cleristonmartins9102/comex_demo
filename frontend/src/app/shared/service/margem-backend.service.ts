import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/config/address';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MargemService {
  bk_ip: any[];
  bk_full_ip: any;
  constructor(
    private http: HttpClient,
    private address: Address
  ) {
    this.bk_ip = this.address.bkAddress();
    this.bk_ip = this.bk_ip[0].ip;
    this.bk_full_ip = `http://${this.bk_ip}/garm/api`;

  }

  getAllDropDown(): Observable<any> {
    return this.http.post(`${this.bk_full_ip}/margem/lista/alldropdown`, '');
  }

  
}
