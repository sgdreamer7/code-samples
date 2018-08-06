import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: any;
  @Output('productAction') productAction: EventEmitter<any> = new EventEmitter<any>();
}
