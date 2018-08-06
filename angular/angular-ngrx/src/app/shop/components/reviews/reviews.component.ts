import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  ratings: any[];
  average: any;
  total: number = 0;

  constructor() {
    this.ratings = [
      { stars: 5, count: 8 },
      { stars: 4, count: 3 },
      { stars: 3, count: 2 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 }
    ];

    this.ratings.forEach((rating: any) => this.total += rating.count);

    this.average = {
      product: 4,
      documentation: 5,
      shipping: 2,
      communication: 5
    };
  }

  ngOnInit(): void {
    //
  }

  get averageRatings(): any[] {
    return Object.keys(this.average);
  }

  countWidth(count: number): string {
    return count / this.total * 100 + '%';
  }

  setColor(star: number, count: number): string {
    return star < count ? 'primary' : null;
  }

}
