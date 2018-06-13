import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${environment.url}/orders`, { observe: 'body'});
  }

  getByUser(userId): Observable<any> {
    const params = new HttpParams();
    params.set('userId', userId);
    return this.http.get(`${environment.url}/orders`, { observe: 'body', params: params });
  }

  getById(idorder): Observable<any> {
    return this.http.get(`${environment.url}/orders/${idorder}`, { observe: 'body'});
  }

  save(order: Order): Observable<any> {
    return this.http.post(`${environment.url}/orders`, order, { observe: 'body'});
  }

  delete(orderid: String): Observable<any> {
    return this.http.delete(`${environment.url}/orders/${orderid}`, { observe: 'body'});
  }

}
