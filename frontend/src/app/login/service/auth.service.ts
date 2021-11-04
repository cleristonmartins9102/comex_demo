import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/config/address';
import { User } from '../model/user.model';
import { tap, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private valor: any;
    private bk_ip: any;
    private bk_full_address: string;

    constructor(
        private http: HttpClient,
        private address: Address,
        private router: Router
    ) {
        this.bk_ip = this.address.bkAddress();
        this.bk_ip = this.bk_ip[0].ip;
        this.bk_full_address = `http://${this.bk_ip}/garm/api`;
    }

    login(userData: User) {
        return this.http.post<any>(`${this.bk_full_address}/login`, userData)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('data', JSON.stringify(jwt_decode(user.token)));
                    localStorage.setItem('ac', user.ac);
                    return user;
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('data');
        this.router.navigate(['/login']);
    }

    getToken() {
        if (typeof (localStorage.currentUser) !== 'undefined') {
            return JSON.parse(localStorage.currentUser).token;
        }
    }

    getUserLogged() {
        if (typeof (localStorage.currentUser) !== 'undefined') {
            return JSON.parse(localStorage.data);
        }
    }
}
