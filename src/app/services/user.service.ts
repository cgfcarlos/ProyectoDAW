import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserService {

  public userEvents = new BehaviorSubject<User>(undefined);

  constructor(private http: HttpClient) {
    this.retrieveUser();
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.url}/users`, { observe: 'body'});
  }

  getById(iduser): Observable<any> {
    return this.http.get(`${environment.url}/users/${iduser}`, { observe: 'body'});
  }

  login(user): Observable<any> {
    const headers = { 'Content-Type': 'application/x-ww-form-urlencoded' };

    return this.http.post(`${environment.url}/login`, { user }, {headers, observe: 'body'})
      .do((res: any) => {
        console.log(res);
        this.storeLoggedInUser(res.user);
      });
  }

  storeLoggedInUser(user) {
    localStorage.setItem('token', JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser() {
    const value = localStorage.getItem('token');
    if (value) {
      const user = JSON.parse(value);
      this.userEvents.next(user);
    }
  }

  logout(user: User): Observable<any> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded'};
    console.log(user);
    return this.http.post(`${environment.url}/logout`, { user }, {headers, observe: 'body'});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
