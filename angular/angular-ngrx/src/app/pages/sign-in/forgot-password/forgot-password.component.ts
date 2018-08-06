import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('dialog') dialog: any;

  private emailRegExp: RegExp =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern(this.emailRegExp)])
  });

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) { }

  ngOnInit(): void {
    this.applyStyles();
  }

  applyStyles(): void {
    const wrapper: any = this.dialog.nativeElement.parentElement.parentElement;
    Object.assign(wrapper.style, {
      borderRadius: '20px',
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  requestPasswordResset(): void {
    this.close();
  }

}
