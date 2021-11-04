import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() items: any;
  @Output() menuResponse = new EventEmitter;

  @ViewChild('childMenu') public childMenu;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  sendMenuEvent(child: {}) {
     this.menuResponse.emit(child);
  }

  isChildren(child, data) {
    return child.expression(data);
  }

  show(d) {
    // console.log(d)
  }
}
