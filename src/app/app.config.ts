import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { PersonState } from './ngxs/my.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(NgxsModule.forRoot([PersonState]))
  ]
};
