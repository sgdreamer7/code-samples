import { AuthGuard } from './auth.guard';
import { IsLoggedInGuard } from './is-logged-in.guard';

export const guards: any[] = [
  AuthGuard,
  IsLoggedInGuard
];

export * from './auth.guard';
export * from './is-logged-in.guard';
