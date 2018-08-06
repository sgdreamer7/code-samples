import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { CustomValidators } from 'app/shared/helpers/customValidators';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss']
})
export class EditPasswordModalComponent implements OnInit {

  passwordForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditPasswordModalComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.passwordForm = this.fb.group({
      old_password: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirm_password: ['', [
        Validators.required
      ]]
    }, {
        validator: CustomValidators.match('password', 'confirm_password')
      });
  }

  get confirmControl(): FormControl {
    return this.passwordForm.get('confirm_password') as FormControl;
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    // TODO:
  }

}
