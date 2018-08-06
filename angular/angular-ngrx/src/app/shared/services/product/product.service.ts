import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(`${environment.api_url}/assets/products`);
  }

  create(): void {
    // TODO
  }

  update(): void {
    // TODO
  }

  delete(): void {
    // TODO
  }
}
