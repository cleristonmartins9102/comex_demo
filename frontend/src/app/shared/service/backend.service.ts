import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/config/address';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  bk_ip: any[];
  bk_full_ip: any;
  constructor(
    private http: HttpClient,
    private address: Address
  ) {
    this.bk_ip = this.address.bkAddress();
    this.bk_ip = this.bk_ip[0].ip;
    this.bk_full_ip = `http://${this.bk_ip}/garm/api/`;

  }

  getEmpresasAll() {
    return this.http.post(`${this.bk_full_ip}/all`, '');
  }

  getEmpresasCriteria(criteria: any) {
    return this.http.post(`${this.bk_full_ip}/filtered`, JSON.stringify(criteria));
  }

  getReportAll(module) {
    return this.http.post(`${this.bk_full_ip}/${module}/all`, '');
  }

  getRegimeAll() {
    return this.http.post(`${this.bk_full_ip}regime/lista/all`, '');
  }

  getRegimeById(id) {
    return this.http.post(`${this.bk_full_ip}regime/lista/byid`, id);
  }

  getRegimeByName(name) {
    const regime = {
      regime: name
    };
    return this.http.post(`${this.bk_full_ip}regime/lista/bynome`, regime);
  }

  getItemPropostaPeriodo(id_processopredicado: string) {
    const processo = {
      id_processopredicado: id_processopredicado
    };
    return this.http.post(`${this.bk_full_ip}proposta/ser/periodo`, processo)
    .pipe(
      take(1)
    );
  }

  getRegimeClass(id_regime: string) {
    const info = {
      id_regime: id_regime
    };
    return this.http.post(`${this.bk_full_ip}regimeclassificacao/lista/byregime`, info)
    .pipe(
      take(1)
    );
  }

  getItemClassificacaoAll() {
    return this.http.post(`${this.bk_full_ip}itemclassificacao/lista/all`, '');
  }
}
