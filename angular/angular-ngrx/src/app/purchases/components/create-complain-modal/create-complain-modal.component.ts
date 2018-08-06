import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Purchase } from 'app/purchases/models';
import { ComplainService } from 'app/purchases/services';

@Component({
  selector: 'app-create-complain-modal',
  templateUrl: './create-complain-modal.component.html',
  styleUrls: ['./create-complain-modal.component.scss']
})
export class CreateComplainModalComponent implements OnInit {

  purchase: Purchase;
  complainForm: FormGroup;
  showForm: boolean;
  showConfirm: boolean = false;
  submitted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private complainService: ComplainService,
    private dialogRef: MatDialogRef<CreateComplainModalComponent>,
    private fb: FormBuilder) {
    this.purchase = data.purchase;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.complainForm = this.fb.group({
      type: ['', [
        Validators.required
      ]],
      text: ['', [
        Validators.required
      ]]
    });
    this.showForm = true;
  }

  sendComplain(): void {
    if (this.complainForm.invalid) {
      return;
    }
    this.submitted = true;
    this.complainService.createComplain(this.complainForm.value).then(
      (res: any) => {
        this.showForm = false;
        this.showConfirm = true;
      }, (err: any) => {
        // TODO: alert message
      });
  }

  close(): void {
    this.dialogRef.close();
  }

}
