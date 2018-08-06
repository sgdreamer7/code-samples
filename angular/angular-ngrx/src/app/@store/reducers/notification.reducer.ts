import * as fromNotifications from '../actions/notification.action';

export class NotificationState {
  message: string;
  error: string;
  lastMessageAt: number;
  lastErrorAt: number;
}

export const initialState: NotificationState = {
  message: '',
  error: '',
  lastMessageAt: null,
  lastErrorAt: null
};

export function reducer(
  state: NotificationState = initialState,
  action: fromNotifications.NotificationAction
): NotificationState {
  switch (action.type) {
    case fromNotifications.NOTIFICATION_SHOW_MESSAGE: {
      return {
        ...state,
        message: action['payload']['message']
      };
    }
    case fromNotifications.NOTIFICATION_SHOW_ERROR: {
      return {
        ...state,
        error: action['payload']['message']
      };
    }
    case fromNotifications.NOTIFICATION_SHOW_MESSAGE_COMPLETE: {
      return {
        ...state,
        lastMessageAt: <number>action['payload']
      };
    }
    case fromNotifications.NOTIFICATION_SHOW_ERROR_COMPLETE: {
      return {
        ...state,
        lastErrorAt: <number>action['payload']
      };
    }
    default: {
      return state;
    }
  }
}
