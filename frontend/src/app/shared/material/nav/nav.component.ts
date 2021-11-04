import { Component, OnInit, ViewChild, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Output() appTitleSend = new EventEmitter;
  notifyOffClicked = false;
  @ViewChild(NavButtonComponent)
  buttonsTemp: NavButtonComponent;

  @Input()
  buttonsConfig: any;
  isSticky = true;

  constructor(
    private router: Router
  ) { }


  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 117;
  // }

  openHome() {
    this.router.navigate(['/']);
  }

  disable() {
    this.notifyOffClicked = false;
  }
}
