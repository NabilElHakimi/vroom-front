import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import { inject } from '@angular/core';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(SuccesstoastService); // Inject the service using Angular's `inject` function

  return next(req).pipe(
    catchError(error => {
      let errorMessage = 'An unexpected error occurred!';

      if (error.status === 0) {
        errorMessage = 'Network error! Please check your internet connection.';
      } else if (error.status === 400) {
        errorMessage = 'Bad Request: Please check the data you sent.';

        toastService.showToast(error.error.message, 'error');
      } else if (error.status === 500) {
        errorMessage = 'Server error: Something went wrong on the server.';
      }

      console.log(errorMessage);

      // Return the error to be handled by the calling code
      return throwError(() => new Error(errorMessage));
    })
  );
};
