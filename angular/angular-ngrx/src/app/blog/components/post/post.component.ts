import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'app/core/models';
import { NgUnsubscribe } from 'app/shared/helpers';

import * as fromRootStore from 'app/@store';
import * as fromStore from 'app/blog/@store';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends NgUnsubscribe implements OnInit, OnDestroy {

  user$: Observable<User>;
  post$: Observable<any>;
  post: any;

  get hasComments(): boolean {
    return this.post.comments && this.post.comments.length > 0;
  }

  get singleComment(): boolean {
    return this.post.comments && this.post.comments.length === 1;
  }

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    super();

    this.user$ = this.store.select(fromRootStore.getUser);
  }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(new fromStore.GetSinglePost(id));
    this.post$ = this.store.select(fromStore.getCurrentPost);
    this.wrapWithTakeUntil(this.post$).subscribe((post: any) => {
      if (post) {
        this.post = post;
      }
    });
  }

  showTextarea(comment: any, reply?: any): void {
    const opened: any = this.post.comments.find((cmnt: any) => cmnt.showTextarea);

    const openedReply: any = this.post.comments
      .find((cmnt: any) => cmnt.replies
        .find((rply: any) => rply.showTextarea));

    if (openedReply) {
      const prev: any = openedReply.replies.find((rply: any) => rply.showTextarea);
      prev['showTextarea'] = false;
      prev['comment'] = null;
    }

    if (opened) {
      opened['showTextarea'] = false;
      opened['comment'] = null;
    }

    if (!reply) {
      comment['showTextarea'] = true;

      return;
    }

    reply['showTextarea'] = true;
  }

  addComment(type: string, entity: any, text: string): void {
    return;
      // TODO: configure ngrx side according to back-end;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.store.dispatch(new fromStore.RemoveCurrentPost());
  }
}
