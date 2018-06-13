import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const headers = {};
    return this.http.get(`${environment.url}/categories`, { observe: 'body'});
  }

  getById(idcategoria): Observable<any> {
    return this.http.get(`${environment.url}/categories/${idcategoria}`, { observe: 'body'});
  }

}
