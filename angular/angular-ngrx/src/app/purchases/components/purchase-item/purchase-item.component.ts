import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Purchase } from 'app/purchases/models';
import { CreateComplainModalComponent } from '../create-complain-modal/create-complain-modal.component';

@Component({
  selector: 'purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss']
})
export class PurchaseItemComponent implements OnInit {

  @Input() purchase: Purchase;

  constructor(private dialog: MatDialog) {
    // TODO:
  }

  ngOnInit(): void {
    // TODO:
  }

  showComplainCreateModal(complain: any): void {
    const dialogRef: any = this.dialog.open(CreateComplainModalComponent, {
      width: '45vw',
      data: { purchase: this.purchase },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // TODO
    });
  }

}
