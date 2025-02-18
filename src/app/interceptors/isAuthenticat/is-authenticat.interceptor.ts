import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs';

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
        return authService.refreshToken().pipe(
          switchMap((newToken: any) => {
            if (newToken && newToken.token) {
              localStorage.setItem('token', newToken.token);
              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.token}`
                }
              });
              return next(clonedReq);
            } else {
              router.navigate(['/login']);
              return [];
            }
          }),
          catchError(() => {
            router.navigate(['/login']);
            return [];
          })
        );
      }
      return [];
    })
  );
};
