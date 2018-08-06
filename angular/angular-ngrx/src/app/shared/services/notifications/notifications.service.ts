import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snack: MatSnackBar) { }

  show(message: string, duration: number, buttonText?: string): void {
    this.snack.open(message, buttonText, {duration});
  }

  error(errorMessage: string, duration: number, buttonText?: string): void {
    this.snack.open(errorMessage, buttonText, { duration, panelClass: 'notification_error'});
  }
}
