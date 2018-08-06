import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-email-modal',
  templateUrl: './edit-email-modal.component.html',
  styleUrls: ['./edit-email-modal.component.scss']
})
export class EditEmailModalComponent implements OnInit {

  emailForm: FormGroup;
  submitted: boolean = false;

  private emailRegExp: RegExp =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(
    public dialogRef: MatDialogRef<EditEmailModalComponent>,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.emailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegExp)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  get emailControl(): FormControl {
    return this.emailForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.emailForm.get('password') as FormControl;
  }

  save(): void {
    // TODO:
  }

  close(): void {
    this.dialogRef.close();
  }

}
