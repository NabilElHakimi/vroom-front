import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {isAuthenticatInterceptor} from './interceptors/isAuthenticat/is-authenticat.interceptor';
import {errorInterceptorInterceptor} from './interceptors/ErrorInterceptor/error-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes) ,
    provideHttpClient(withInterceptors([errorInterceptorInterceptor , isAuthenticatInterceptor]))

  ]
};
