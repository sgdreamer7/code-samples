import { BlogLanguageEffects } from './language.effect';
import { PostEffects } from './post.effect';

export const effects: any[] = [
  BlogLanguageEffects,
  PostEffects
];

export * from './language.effect';
export * from './post.effect';
