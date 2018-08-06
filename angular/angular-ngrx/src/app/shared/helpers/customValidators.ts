import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Match two controls if they are the same
   * @param firstControlName
   * @param secondControlName
   * @returns {(AC: AbstractControl) => any}
   * @constructor
   */
  static match(firstControlName: string, secondControlName: string): any {
    return (AC: AbstractControl): any | void => {
      const firstControlValue: any = AC.get(firstControlName).value;
      const secondControlValue: any = AC.get(secondControlName).value;

      if (firstControlValue === secondControlValue) {
        return null;
      }

      AC.get(secondControlName).setErrors({ match: true });
    };
  }
}
