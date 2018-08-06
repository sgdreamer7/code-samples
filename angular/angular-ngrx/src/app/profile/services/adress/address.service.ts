import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'environments/environment';

@Injectable()
export class AddressService {

  constructor(private http: HttpClient) { }

  searchCountries(search: string): Observable<any> {
    return this.http.get(`${environment.api_url}/assets/countries`);
  }

  searchCitiesByCountry(countryCode: string): Observable<any> {
    return this.http.get(`${environment.api_url}/assets/cities`);
  }
}
