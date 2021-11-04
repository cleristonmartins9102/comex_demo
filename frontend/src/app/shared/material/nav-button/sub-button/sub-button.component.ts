import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sub-button',
  templateUrl: './sub-button.component.html',
  styleUrls: ['./sub-button.component.css']
})
export class SubButtonComponent {
  @Input() btnConfig: any;
  @Input()
  route: string;

}
