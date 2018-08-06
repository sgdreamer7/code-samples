import { Action } from '@ngrx/store';

export const NOTIFICATION_SHOW_MESSAGE: string = '[Notification] Show Message';
export const NOTIFICATION_SHOW_ERROR: string = '[Notification] Show Error';

export class Notification {
  message: string;
  duration: number;
}

export class ShowMessage implements Action {
  readonly type: string = NOTIFICATION_SHOW_MESSAGE;
  constructor(public payload: Notification) {}
}

export class ShowError implements Action {
  readonly type: string = NOTIFICATION_SHOW_MESSAGE;
  constructor(public payload: Notification) {}
}

export const NOTIFICATION_SHOW_MESSAGE_COMPLETE: string = '[Notification] Show Message Complete';
export const NOTIFICATION_SHOW_ERROR_COMPLETE: string = '[Notification] Show Error Complete';

export class ShowMessageComplete {
  readonly type: string = NOTIFICATION_SHOW_MESSAGE_COMPLETE;
  constructor(public payload: number) {}
}

export class ShowErrorComplete {
  readonly type: string = NOTIFICATION_SHOW_ERROR_COMPLETE;
  constructor(public payload: number) {}
}

export type NotificationAction = ShowMessage
  | ShowError
  | ShowMessageComplete
  | ShowErrorComplete;
