import { HttpErrorResponse } from '@angular/common/http';

// TODO: add more descriptions for errors;

export function handleError(error: Error | HttpErrorResponse): void {
  if (error instanceof HttpErrorResponse) {
    console.error(`Http Error occured`, error);

    return;
  }

  console.error(`Client Side`, error);
}
