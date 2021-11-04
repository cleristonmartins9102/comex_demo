import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './service/auth.service';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('icon', [
      state('close', style({
        left: '0'
      })),
      state('open', style({
        left: '-45px'
      })),
      transition('*=>close', animate('250ms')),
      transition('*=>open', animate('250ms'))
    ]),
  ]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private authService: AuthService
  ) { }
  error: string;
  userIco = 'initial';
  passIco = 'initial';
  returnUrl: string;
  username: string;
  password: string;
  loading = false;
  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.actRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  userFocus() {
    this.userIco = 'open';
  }
  passFocus() {
    this.passIco = 'open';
  }
  userBlur() {
    this.userIco = 'close';
  }
  passBlur() {
    this.passIco = 'close';
  }

  login(): void {
    this.loading = true;

    const userData = {
      usuario: this.username,
      senha: this.password
    };
    this.authService.login(userData)
    .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              if (error.error.message === 'invalid password') {
                this.error = 'Senha inváĺida.';
              } else if (error.error.message === 'invalid user') {
                this.error = 'Usuário inváĺido.';
              }
            }
          }
          this.loading = false;
        });
  }
}
