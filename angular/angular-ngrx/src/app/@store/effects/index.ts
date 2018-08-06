import { ProductEffects } from './product.effect';
import { RouterEffects } from './router.effect';
import { ReviewEffects } from './review.effect';
import { LanguageEffects } from './language.effect';
import { AuthEffects } from './auth.effect';
import { NotificationEffects } from './notification.effect';

export const effects: any[] = [
  ProductEffects,
  RouterEffects,
  ReviewEffects,
  LanguageEffects,
  AuthEffects,
  NotificationEffects
];

export * from './product.effect';
export * from './router.effect';
export * from './review.effect';
export * from './language.effect';
export * from './auth.effect';
export * from './notification.effect';
