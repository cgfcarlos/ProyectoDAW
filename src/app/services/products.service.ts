import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${environment.url}/products`, { observe: 'body'});
  }

  getById(id): Observable<any> {
    return this.http.get(`${environment.url}/${id}`, { observe: 'body'});
  }

  save(product): Observable<any> {
    return this.http.post(`${environment.url}/products`, product, { observe: 'body'});
  }

  update(product: Product): Observable<any> {
    return this.http.put(`${environment.url}/products/${product.idproducto}`, product, { observe: 'body'});
  }

  delete(idproducto): Observable<any> {
    return this.http.delete(`${environment.url}/products/${idproducto}`, { observe: 'body'});
  }

}
