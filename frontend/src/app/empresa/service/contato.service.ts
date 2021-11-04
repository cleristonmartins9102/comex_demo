import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Address } from 'src/app/config/address';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ContatoEmpresaService {
    bk_ip: any;
    bk_full_address: string;
    proposta_next_number = 1;

    constructor(
      private http: HttpClient,
      private address: Address
    ) {
      this.bk_ip = this.address.bkAddress();
      this.bk_ip = this.bk_ip[0].ip;
      this.bk_full_address = `http://${this.bk_ip}/garm/api`;
    }

    getContato(object: {id, currentField}) {
        return this.http.post(`${this.bk_full_address}/contato/lista/byid`, {'id_contato': object.id});
    }

    getContatoAll() {
        return this.http.post(`${this.bk_full_address}/contato/lista/all`, null);
    }

    deleteGrupoDeContato(id: string, callback): any {
        const id_grupo = {
            'id': id
        };
        this.http.post(`${this.bk_full_address}/grupodecontato/record/delete/byid`, id_grupo).subscribe((dados) => {
            if (dados === 1) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    getGrupoDeContato(coadjuvante: string, adstrito: string) {
        const envolvidos: {} = {
            coadjuvante: coadjuvante,
            adstrito: adstrito
        };
        return this.http.post(`${this.bk_full_address}/grupodecontato/lista/byenvolvidos`, JSON.stringify(envolvidos));
    }

    getGrupoDeContatoById(model: {value}) {
        return this.http.post(`${this.bk_full_address}/grupodecontato/lista/byid`, { 'id_grupodecontato': model.value});
    }

    getGrupoContato(model) {
        return this.http.post(`${this.bk_full_address}/grupocontato/lista/byid`, { 'id': model.value});
    }

    // Retorna os grupos de contatos dos envolvidos
    getGrupoContatoByEnvolvidos(idCoadjuvante: string, idAdstrito: string) {
        const envolvidos = {
            coadjuvante: idCoadjuvante,
            adstrito: idAdstrito
        };
        return this.http.post(`${this.bk_full_address}/grupodecontato/lista/byenvolvidos`, JSON.stringify(envolvidos));
    }

    // Retorna apenas os nomes dos grupos que ainda não foram criados para os envolvidos juntos
    getGrupoNomesPadroes(idCoadjuvante: string, idAdstrito: string): Observable<any> {
        const envolvidos = {
            id_coadjuvante: idCoadjuvante,
            id_adstrito: idAdstrito
        };
        // Pega grupos restantes para a empresa selecionada, ou pega todos caso não tenha sido selecionada empresa.
        return this.http.post(`${this.bk_full_address}/grupodecontatonome/lista/byenvolvidos`, JSON.stringify(envolvidos)).pipe(take(1));
    }
}
