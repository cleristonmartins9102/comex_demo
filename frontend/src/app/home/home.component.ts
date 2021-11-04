import { Component, OnInit } from '@angular/core';
import { AutorizatedService } from '../login/service/autorizated.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private autorizatedService: AutorizatedService
  ) { }

  ngOnInit() {
  }

  check(module: string) {
   return this.autorizatedService.autorizatedModule(module);
  }
}
