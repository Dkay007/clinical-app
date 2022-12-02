import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { DataProviderService } from './data-provider.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private _token$: BehaviorSubject<string> = new BehaviorSubject<string>(sessionStorage.getItem('session-token'));
    public token$: Observable<string> = this._token$.asObservable();

    constructor(
        private router: Router,
        private dataProviderService: DataProviderService
    ) { 
    }

    public login(username: string, password: string): Observable<any> {
        return from(this.dataProviderService.postData('/login', window.btoa(username+ ':' + password)));
    }

    public logout(): void {
        sessionStorage.removeItem('logged-in-user');
        sessionStorage.removeItem('session-token');        
        this.router.navigate(['/login']);
    }

    public currentTokenChanged(user: string): void {
        this._token$.next(user);
    }
    
}