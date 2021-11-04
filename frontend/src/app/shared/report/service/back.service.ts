import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Address } from 'src/app/config/address';
import { FormArray } from '@angular/forms';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class BackEndReport {
    bk_ip: any;
    bk_full_address: string;
    token = JSON.parse(localStorage.currentUser).token;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/text', 'Authorization': `Bearer ${this.token}` }) };

    constructor(
        private http: HttpClient,
        private address: Address
    ) {
        // console.log(JSON.parse(localStorage.currentUser))
        this.bk_ip = this.address.bkAddress();
        this.bk_ip = this.bk_ip[0].ip;
    }

    getAll(module: string, sort: string, order: string, page: number, pageSize: number) {
        const href = `http://${this.bk_ip}/garm/api/${module}/lista/all`;
        const requestUrl =
            `${href}/${sort}/${order}/${pageSize}/page${page + 1}`;
        return this.http.get(requestUrl);
    }

    getAllOfProcesso(module: string, sort: string, order: string, page: number, pageSize: number) {
        const href = `http://${this.bk_ip}/garm/api/${module}/lista/ofprocesso`;
        const requestUrl =
            `${href}/${sort}/${order}/${pageSize}/page${page + 1}`;
        return this.http.get(requestUrl);
    }

    getAllOfFatura(module: string, sort: string, order: string, page: number, pageSize: number) {
        const href = `http://${this.bk_ip}/garm/api/${module}/lista/offatura`;
        const requestUrl =
            `${href}/${sort}/${order}/${pageSize}/page${page + 1}`;
        return this.http.get(requestUrl);
    }

    getAllTotal(module: string, sort: string, order: string, page: number, pageSize: number) {
        const href = `http://${this.bk_ip}/garm/api/${module}/lista/alltotal`;
        const requestUrl =
            `${href}/${sort}/${order}/${pageSize}/page${page + 1}`;
        return this.http.get(requestUrl);
    }

    /**
     * Busca as captações monitoradas que não foram geradas liberações
     * @param module
     * @param sort
     * @pa  ram order
     * @param page
     * @param pageSize
     */
    getAllCapMon(module: string, sort: string, order: string, page: number, pageSize: number) {
        const href = `http://${this.bk_ip}/garm/api/${module}/lista/mon`;
        const requestUrl =
            `${href}/${sort}/${order}/${pageSize}/page${page + 1}`;
        return this.http.get(requestUrl);
    }

    getModelo(module: string, sort: string, order: string, page: number, pageSize: number) {
        const href = `http://${this.bk_ip}/garm/api/${module}/lista/modelo`;
        const requestUrl =
            `${href}/${sort}/${order}/${pageSize}/page${page + 1}`;
        return this.http.get(requestUrl);
    }

    getComum(module: string, sort: string, order: string, page: number, pageSize: number) {
        const href = `http://${this.bk_ip}/garm/api/${module}/lista/comum`;
        const requestUrl =
            `${href}/${sort}/${order}/${pageSize}/page${page + 1}`;
        return this.http.get(requestUrl);
    }

    getHistorico(id: string, module: string, appname: string): Observable<any> {
        const href = `http://${this.bk_ip}/garm/api/${appname}/historico/by${appname}`;
        const requestUrl =
            `${href}`;
        return this.http.post(requestUrl, { id_app: id });
    }

    getAllCriteria(valor, module) {
        const href = `http://${this.bk_ip}/garm/api/${module}/lista/filtered`;
        const requestUrl = `${href}`;
        return this.http.post(requestUrl, valor);
    }

    download(filter: any, module: string, appname: string) {
        const href = `http://${this.bk_ip}/garm/api/${appname}/lista/download`;
        const filters = [];
        // Verifica se o valor é um array, caso sim, intera todos os elementos e verifica se é objeto e instancia de FormArray
        if (Array.isArray(filter)) {
            filter.forEach(item => {
                const data = {
                    field: null,
                    expression: null,
                    filter: null
                };
                data.field = item.field;
                data.expression = item.expression;
                if (typeof (item.filter) === 'object' && item.filter instanceof FormArray) {
                    // Pega o valor do formGroup dentro do FormArray
                    data.filter = item.filter.value;
                } else {
                    data.filter = item.filter;
                }
                filters.push(data);
            });
        }
        const filter64 = btoa(JSON.stringify(filters));
        // const requestUrl = `${href}/${filter64}`;
        const requestUrl = `${href}`;

        this.http.post(requestUrl, { filter: filter64 }, {
            responseType: "blob",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        }).subscribe(blob => this.downloadFile(blob));
        // window.open(requestUrl);

        // this.http.get(requestUrl).subscribe(
        //     (d:any) => {
        //         console.log(1, d)
        //         // let blob = new Blob([d],  { type: "application/ms-excel" });
        //         // let url = window.URL.createObjectURL(blob);
        //         // let pwa = window.open(url);
        //     }
        // );
    }

    downloadFile(data) {
        //Download type xls
        const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        //Download type: CSV
        const contentType2 = 'text/csv';
        const blob = new Blob([data], { type: contentType });
        console.log(blob)
        const url = window.URL.createObjectURL(blob);
        //Open a new window to download
        // window.open(url); 

        //Download by dynamically creating a tag
        const a = document.createElement('a');
        a.href = url;
        // a.download = fileName;
        a.download = this.getDataNow() + '.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    getDataNow() {
        let today: any = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }
}
