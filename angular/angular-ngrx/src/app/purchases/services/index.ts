import { ComplainService } from './complain/complain.service';
import { PurchasesService } from './purchases/purchases.service';

export const services: any[] = [
  ComplainService,
  PurchasesService
];

export * from './complain/complain.service';
export * from './purchases/purchases.service';
