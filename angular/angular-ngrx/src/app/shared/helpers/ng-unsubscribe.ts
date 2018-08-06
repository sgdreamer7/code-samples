import { Component, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ng-unsubscribe',
  template: '<p>Unsubscribe with rxjs</p>'
})
export abstract class NgUnsubscribe implements OnDestroy {
  protected ngUnsubscribe$: Subject<any> = new Subject<any>();

  wrapWithTakeUntil(observable: Observable<any>): Observable<any> {
    return observable
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
