import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BackEndFatura } from 'src/app/financeiro/fatura/service/back-end.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-fatura-age',
  templateUrl: './print-fatura.component.html',
  styleUrls: ['./print-fatura.component.css']
})
export class PrintFaturaAgeComponent implements OnInit {
  faturaContaineres: any;
  faturaItens: any;
  fatura: any;
  itens: any;
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
      // window.print();
    });
  }

  getTemplate(): TemplateRef<any> {
    return this.espelho;
  }

}
