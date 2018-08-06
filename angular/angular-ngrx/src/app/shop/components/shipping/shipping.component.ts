import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  @Input() shippingInfo: any[];
  displayedColumns: any;
  country: string = 'Ukraine';

  constructor() {
    this.shippingInfo = [
      { rate: 'Pickup from Nova Poshta', price: 50 },
      { rate: 'Courier Nova Poshta', price: 50 }
    ];
    this.displayedColumns = Object.keys(this.shippingInfo[0]);
  }

  ngOnInit(): void {
    //
  }

}
