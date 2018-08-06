import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PurchasesService } from 'app/purchases/services';
import { Purchase, PurchaseSearch, PurchaseFilter } from 'app/purchases/models';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PurchasesComponent implements OnInit {

  purchases: Purchase[] = [];
  purchasesLoaded: boolean = false;
  isAllPurchasesLoaded: boolean = false;

  filters: PurchaseFilter = {
    page: 1,
    size: 25
  };

  searchOpts: PurchaseSearch = {
    field: 'number',
    value: '',
  };

  constructor(private purchasesService: PurchasesService) {
    // TODO:
  }

  ngOnInit(): void {
    this.getPurchases(1);
  }

  getPurchases(page: number): void {
    this.filters.page = page;
    this.purchasesService.getPurchases(this.filters).subscribe((data: any) => {
      this.purchases = data.content;
      this.purchasesLoaded = true;
    }, (err: any) => {
      this.purchases = [];
      this.purchasesLoaded = true;
    });
  }

  searchPurchases(opts: PurchaseSearch): void {
    // TODO:
  }

  loadMore(): void {
    const newFilters: PurchaseFilter = { ...this.filters };
    newFilters.page++;
    this.purchasesService.getPurchases(newFilters).subscribe((data: any) => {
      if (data.last) {
        this.isAllPurchasesLoaded = true;
      }
      this.purchases = [...this.purchases, ...data.content];
    }, (err: any) => {
      this.purchases = [];
    });
  }

}
