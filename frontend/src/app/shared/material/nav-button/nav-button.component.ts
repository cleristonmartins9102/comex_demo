import { Component, ViewChild, TemplateRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

import { SubButtonComponent } from './sub-button/sub-button.component';
import { OnInit } from '@angular/core';
@Component({
  selector: 'nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css']
})
export class NavButtonComponent implements OnChanges {

  @Input() buttonsConfig: any;
  @Input() clicked = false;
  @Output() clickedEvent = new EventEmitter;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  ngOnChanges() {
  }

}
