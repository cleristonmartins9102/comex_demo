import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
  }

  legged() {
    return localStorage.currentUser;
  }

  userName(): boolean {
    if (this.legged()) {
      return JSON.parse(localStorage.data).name;
    }
  }

}
