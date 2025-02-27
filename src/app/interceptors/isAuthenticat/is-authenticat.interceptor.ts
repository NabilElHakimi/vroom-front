import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap } from 'rxjs';

export const isAuthenticatInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const excludedUrls = ['/auth/login', '/auth/register', '/auth/refresh-token'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) return next(req);

  const token = localStorage.getItem('token');
  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 403) {
        console.log('Token expired. Attempting to refresh...');

        return authService.refreshToken().pipe(
          switchMap((newToken: any) => {
            console.log('Token refresh response:', newToken);

            if (newToken && newToken.token) {
              console.log('New token received, updating and retrying request');
              localStorage.setItem('token', newToken.token);
              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.token}`
                }
              });
              return next(clonedReq);
            } else {
              console.log('Invalid token response, redirecting to login');
              router.navigate(['/login']);
              return EMPTY; // Using EMPTY instead of [] for clarity
            }
          }),
          catchError(refreshError => {
            console.error('Error refreshing token:', refreshError);
            router.navigate(['/login']);
            return EMPTY; // Using EMPTY instead of [] for clarity
          })
        );
      }

      // For all other errors, let the error interceptor handle them
      throw error;
    })
  );
};
