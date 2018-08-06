import { Injectable } from '@angular/core';

import * as fromModels from 'app/purchases/models';

@Injectable()
export class ComplainService {

  constructor() {
    // TODO:
  }

  createComplain(complain: fromModels.Complain): Promise<any> {
    // return this.http.post(`${environment.api_url}/complains`, {complain}).toPromise();
    return Promise.resolve({status: 201});
  }

}
