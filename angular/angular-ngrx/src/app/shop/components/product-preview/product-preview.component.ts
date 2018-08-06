import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnChanges {

  @Input() thumbnails: any[];

  mainImage: string;

  constructor() {
    //
  }

  ngOnChanges(): void {
    this.mainImage = this.thumbnails[0];
  }

  changeMainImage(image: any): void {
    this.mainImage = image;
  }

}
