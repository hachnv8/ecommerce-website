import { Injectable } from '@angular/core';
import { has } from 'lodash';
import { Observable, Subject } from 'rxjs';

export interface ILocalStorageData {
  authorization: string;
  language: string;
  userData: any;
}

@Injectable()
export class LocalStoreService {
  private userSubject = new Subject<any>();
  constructor() { }

  get getToken() {
    return localStorage.getItem('token');
  }

  get getUserData() {
    return this.get('user');
  }

  get language() {
    return localStorage.getItem('language');
  }

  setUserData(data) {
    if (has(data, 'token')) localStorage.setItem('token', data.token);
    if (has(data, 'user')) {
      localStorage.setItem('user', JSON.stringify(data.user));
      this.userSubject.next(data.user);
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
    this.userSubject.next(null);
  }

  getUserSubject(): Observable<any> {
    return this.userSubject.asObservable();
  }

  get(key: string) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (_e) {
      return value;
    }
  }

  set(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

}
