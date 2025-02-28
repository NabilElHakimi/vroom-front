import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { SuccesstoastService } from '../../services/toast-service/successtoast.service';
import { inject } from '@angular/core';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(SuccesstoastService);

  // Special handling for refresh token requests - don't intercept their errors
  if (req.url.includes('/auth/refresh-token')) {
    return next(req);
  }

  return next(req).pipe(
    catchError(error => {

      if (error.status === 403) {
        throw error;
      }

      let errorMessage = 'An unexpected error occurred!';

      try {
        if (error.status === 0) {
          errorMessage = 'Network error! Please check your internet connection.';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Please check the data you sent.';
          if (error.error && error.error.message) {
            toastService.showToast(error.error.message, 'error');
          } else {
            toastService.showToast(errorMessage, 'error');
          }
        } else if (error.status === 500) {
          errorMessage = 'Server error: Something went wrong on the server.';
          toastService.showToast(errorMessage, 'error');
        }

        console.log(errorMessage);
      } catch (e) {
        console.error('Error in error interceptor:', e);
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};
