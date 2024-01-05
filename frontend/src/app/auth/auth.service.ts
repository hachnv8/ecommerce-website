import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../core/models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable({ providedIn: 'root' })
export class AuthService {
    private registerUrl = `${environment.apiUrl}` + "/auth/register";
    private loginUrl = `${environment.apiUrl}` + "/auth/authenticate";
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(this.loginUrl, { email, password })
            .pipe(map(user => {
                console.log(user);
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(user: User) {
        return this.http.post<any>(this.registerUrl, user);
    }
}
