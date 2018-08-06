import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-profile-modal',
  templateUrl: './delete-profile-modal.component.html',
  styleUrls: ['./delete-profile-modal.component.scss']
})
export class DeleteProfileModalComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteProfileModalComponent>,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  initForm(): void {
    this.form = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  deleteProfile(): void {
    // TODO:
    this.submitted = true;
  }

  close(): void {
    this.dialogRef.close();
  }

}
