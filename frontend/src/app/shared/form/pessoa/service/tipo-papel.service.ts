import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoPapelService {

  constructor(private http: HttpClient) { }

  getPapeis() {
    return [
      {'id': 1, 'nome': 'Cliente'},
      {'id': 2, 'nome': 'Fornecedor'},
      {'id': 3, 'nome': 'Importador'},
      {'id': 4, 'nome': 'Exportador'},
      {'id': 5, 'nome': 'Despachante'},
      {'id': 6, 'nome': 'Transportadora'},
      {'id': 7, 'nome': 'Agente de Carga'},
      {'id': 8, 'nome': 'Colaborador'},
    ];
  }
}
