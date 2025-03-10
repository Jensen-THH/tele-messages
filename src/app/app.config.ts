import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './interceptor/loading.interceptor';
import { provideRouter } from '@angular/router';
import routeConfig from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideAnimations(),
    provideRouter(routeConfig)
  ]
};
