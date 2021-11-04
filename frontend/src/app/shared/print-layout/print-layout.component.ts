import { Component, OnInit } from '@angular/core';
import { BackEndFatura } from 'src/app/financeiro/fatura/service/back-end.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {

  constructor(
    private routerAct: ActivatedRoute
  ) {}
  
  ngOnInit() {

  }

}
