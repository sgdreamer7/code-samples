import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${environment.api_url}/assets/posts`);
  }

  getPost(id: number): Observable<any> {
    return this.get()
      .pipe(
        map((posts: any) => posts.find((post: any) => post.id === id))
      );
  }

  create(): void {
    // TODO:
  }

  update(): void {
    // TODO:
  }

  delete(): void {
    // TODO:
  }
}
