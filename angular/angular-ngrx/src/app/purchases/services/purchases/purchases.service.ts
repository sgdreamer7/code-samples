import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { PurchaseFilter } from 'app/purchases/models';

@Injectable()
export class PurchasesService {

  constructor(private http: HttpClient) { }

  getPurchases(opts: Partial<PurchaseFilter> = {}): Observable<any> {
    const params: HttpParams = new HttpParams({ fromObject: opts });

    return this.http.get(`${environment.api_url}/assets/purchases`, { params });
  }

  getOrder(id: number): Promise<any> {
    return this.http.get(`${environment.api_url}/assets/purchases`)
      .toPromise()
      .then((res: any) => res.content.find((order: any) => order.id === id));
}

}
