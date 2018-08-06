import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private iconNames: string[] = [
    'box', 'calendar', 'cart', 'check', 'close', 'default-profile', 'dialog', 'edit', 'heart-filled', 'heart',
    'inbox', 'papers', 'pencil', 'pin', 'search', 'star', 'store', 'thrash', 'web'
  ];

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  init(): void {
    this.iconNames.forEach((icon: string) => {
      this.iconRegistry.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`));
    });
  }
}
