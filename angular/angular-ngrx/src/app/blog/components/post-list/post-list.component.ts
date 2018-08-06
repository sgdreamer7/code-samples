import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// import { Post } from 'app/blog/models';

import * as fromStore from 'app/@store';
import * as fromBlogStore from 'app/blog/@store';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.loading$ = this.store.select(fromBlogStore.getPostLoaded);
    this.posts$ = this.store.select(fromBlogStore.getAllPosts);
  }

  redirectToCategory(event: Event, category: any): void {
    event.preventDefault();
    this.store.dispatch(new fromStore.Go({path: ['blog', 'categories', category.name.toLowerCase()] }));
  }

  readPost(event: Event, post: any): void {
    event.preventDefault();
    this.store.dispatch(new fromStore.Go({path: ['blog', 'post', post.id]}));
  }
}
