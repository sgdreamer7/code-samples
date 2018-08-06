import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgUnsubscribe } from 'app/shared/helpers';
import { PurchasesService } from 'app/purchases/services';
import { Order } from 'app/purchases/models';
import { User } from 'app/core/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends NgUnsubscribe implements OnInit {

  subscriptions: any = {};
  user: User;

  order: Order = null;
  orderLoaded: boolean = false;

  noAuthBlockVisible: boolean;
  showBackButton: boolean; // Show back button only on profile/purchases/:id page

  constructor(
    private purchasesService: PurchasesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
   }

  ngOnInit(): void {
    // this.wrapWithTakeUntil(this.authService.getCurrentUser())
    //   .subscribe((user: User) => {
    //     this.user = user;
    //     this.noAuthBlockVisible = user ? false : true;
    //   });

    this.showBackButton = this.router.url.includes('/profile/');

    const orderId: number = +this.route.snapshot.paramMap.get('id');
    this.loadOrder(orderId);
  }

  loadOrder(id: number): void {
    this.purchasesService.getOrder(id)
      .then((order: Order) => {
        this.order = order;
        this.orderLoaded = true;
      })
      .catch((err: Error) => {
        this.orderLoaded = true;
      });
  }

  hideNoAuthBlock(): void {
    this.noAuthBlockVisible = false;
  }

  back(): void {
    this.router.navigate(['profile', 'purchases']);
  }

}
