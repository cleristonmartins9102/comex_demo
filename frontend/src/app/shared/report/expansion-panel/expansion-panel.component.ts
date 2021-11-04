import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/config/address';

@Component({
  selector: 'expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css']
})

export class ExpPanelServicoComponent implements OnInit {

  @Input('subTableItens') dataSource: any;
  @Input() subTableCol: any;
  @Input() title: string;
  @Input() description: string;
  tableRow: any[] = [];
  objFull: Object = {};
  addressDownload: string;
  constructor(
    private address: Address
  ) {
    this.addressDownload = this.address.bkAddress()[0].ip;
  }

  ngOnInit() {
    this.subTableCol.tables.forEach((element: any, i) => {
      const obj = {};
      const name = element.subTableTitle.toLowerCase();
      obj[name] = [];
      element.buttons.forEach(button => {
        obj[name].push(button.nameDB);
      });
      this.objFull[name] = obj[name];
    });
  }

  showValue(value) {
    console.log(value);
  }

  checkTypeValue(value) {
    if (value.indexOf('.')) {
      console.log(value.includes('.'));

      return 'string';

    }
  }
}
