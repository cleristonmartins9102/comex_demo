import { Component, OnInit, ViewChild, TemplateRef, OnChanges } from '@angular/core';
import { BackEndFatura } from 'src/app/financeiro/fatura/service/back-end.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-fatura-arm',
  templateUrl: './print-fatura.component.html',
  styleUrls: ['./print-fatura.component.css']
})
export class PrintFaturaArmComponent implements OnInit, OnChanges {
  faturaContaineres: any;
  faturaItens: any;
  fatura: any;
  itens: any;
  totalLegend = 'Total Despesas';
  itensDespesas = [];
  itensImpostos = [];
  @ViewChild('espelho') espelho: TemplateRef<any>;

  constructor(
    private bkFatura: BackEndFatura,
    private routerAct: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id: string = this.routerAct.snapshot.paramMap.get('id');
    // this.fatura = this.bkFatura.getFaturaById(2)
    this.bkFatura.getFaturaById(id).subscribe((dados: any) => {
      this.fatura = dados;
      this.faturaItens = dados.itens;
      this.faturaContaineres = dados.containeres;
      this.prepareItens();
    });
  }

  ngOnChanges() {
  }

  getTemplate(): TemplateRef<any> {
    return this.espelho;
  }

  prepareItens() {
    const itens = this.faturaItens;
    if (itens.length > 0) {
      // Calculando total de impostos
      itens.forEach(item => {
        if (typeof(item.servico) !== 'undefined' && (item.servico === 'Impostos' || item.servico === 'impostos')) {
          this.itensImpostos.push(item);
          this.totalLegend = 'Total despesas + Impostos';
        } else if (item.valor_item > 0){
          if ( item.descricao.includes('Desconto') ) {
            item.valor_unit = item.valor_unit * -1; 
            item.valor_item = item.valor_item * -1; 
          }
          
          this.itensDespesas.push(item);
        }
      });
      console.log(this.itensDespesas)
      setTimeout(() => window.print(),100)
    }
  }


}
