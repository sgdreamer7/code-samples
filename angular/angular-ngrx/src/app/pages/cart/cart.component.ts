import { Component, OnInit } from '@angular/core';

import { CartService } from 'app/shared/services';
import { handleError } from 'app/shared/helpers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orders: any[] = [
    {
      shop: {
        name: 'NiceRF',
        id: 0,
        thumbnail: 'https://randomuser.me/api/portraits/men/99.jpg'
      },
      products: []
    }
  ];
  total: number;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  async getOrders(): Promise<void> {
    try {
      this.orders[0].products = await this.cartService.get();

      // only for dev
      this.orders = await this.createQuantity(this.orders);
      this.countTotals();
    } catch (error) {
      return handleError(error);
    }
  }

  navigate(path: string): void {
    // todo
  }

  createQuantity(orders: any): Promise<any[]> {
    orders.forEach((order: any) => {
      order.products.forEach((product: any) => {
        product['quantity'] = 1;
      });
    });

    return Promise.resolve(orders);
  }

  changeQuantity(product: any, toIncrease: boolean): void {
    if (product['quantity'] === 0 && !toIncrease) {
      return;
    }

    if (toIncrease) {
      product['quantity'] += 1;
      this.countTotals();

      return;
    }

    product['quantity'] -= 1;
    this.countTotals();
  }

  countTotals(): void {
    this.total = 0;

    this.orders[0].products.forEach((product: any) => {
      this.total += (product.price * product['quantity']);
    });
  }

}
