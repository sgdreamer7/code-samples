import { ProductService } from './product/product.service';
import { ReviewService } from './review/review.service';
import { NotificationsService } from './notifications/notifications.service';
import { CartService } from './cart/cart.service';

export const services: any[] = [
  ProductService,
  ReviewService,
  NotificationsService,
  CartService
];

export * from './product/product.service';
export * from './review/review.service';
export * from './notifications/notifications.service';
export * from './cart/cart.service';
