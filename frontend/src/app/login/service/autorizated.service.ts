import { Injectable } from '@angular/core';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AutorizatedService {
    autorizatedModule(module: string): boolean {
        if (typeof (localStorage.currentUser) !== 'undefined') {
            const permission = JSON.parse(atob(localStorage.ac));
             if (module in permission) {
                return true;
            }
        }
    }
    autorizatedSubModule(module: string): Array<any> {
        if (typeof (localStorage.currentUser) !== 'undefined') {
            const permission = JSON.parse(atob(localStorage.ac));
            if (module in permission) 
               return permission[module] as Array<any>;
            return null
        }
    }
}
