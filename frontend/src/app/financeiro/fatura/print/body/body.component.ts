import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PrintFaturaAgeComponent } from '../agenciamento/print-fatura.component';
import { PrintFaturaArmComponent } from '../armazenagem/print-fatura.component';
import { BackEndFatura } from '../../service/back-end.service';
import { ActivatedRoute } from '@angular/router';
import { PrintFaturaTrcComponent } from '../debito-transporte/print-fatura.component';
import { PrintFaturaExpComponent } from '../exportacao/print-fatura.component';

@Component({
  selector: 'app-body-fatura',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyEspelhoFaturaComponent implements OnInit {
  template: TemplateRef<any>;
  @ViewChild(PrintFaturaAgeComponent) PrintFaturaAgeComponent: PrintFaturaAgeComponent;
  @ViewChild(PrintFaturaArmComponent) PrintFaturaArmComponent: PrintFaturaArmComponent;
  @ViewChild(PrintFaturaTrcComponent) PrintFaturaTrcComponent: PrintFaturaTrcComponent;
  @ViewChild(PrintFaturaExpComponent) PrintFaturaExpComponent: PrintFaturaExpComponent;

  constructor(
    private bkFatura: BackEndFatura,
    private routeAct: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.routeAct.snapshot.paramMap.get('id');
    this.bkFatura.getFaturaById(id).subscribe( (fatura: any) => {
      switch (fatura.modelo_nome) {
        case 'Armazenagem':
          this.template = this.PrintFaturaArmComponent.getTemplate();
          break;

        case 'Nota de Agênciamento':
          this.template = this.PrintFaturaAgeComponent.getTemplate();
          break;

        case 'Nota de Débito Transporte':
          this.template = this.PrintFaturaTrcComponent.getTemplate();
          break;
        case 'Exportação':
          this.template = this.PrintFaturaExpComponent.getTemplate();
          break;

        default:
          break;
      }
    });
  }

}
