import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filters-panel',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  steps: boolean[] = [false, false, false, false];

  get step1(): boolean {
    return this.steps[0];
  }

  get step2(): boolean {
    return this.steps[1];
  }

  get step3(): boolean {
    return this.steps[2];
  }

  get step4(): boolean {
    return this.steps[3];
  }

  constructor() {
    // TODO: init store service to apply filters to
  }

  ngOnInit(): void {
    // TODO: init store service to apply filters to
  }

  toggleStep(index: number): void {
    this.steps[index] = !this.steps[index];
  }
}
