import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';
import {
  BattleshipStore,
  Config,
  environment,
  tokenInterceptor,
} from '@osrs-battleship/shared';
import { appRoutes } from './app.routes';

import { IconDefinition } from '@ant-design/icons-angular';
import { provideNzIcons } from 'ng-zorro-antd/icon';

import { LoadingOutline, SyncOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [SyncOutline, LoadingOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding(), withHashLocation()),
    provideNzIcons(icons),
    { provide: Config, useValue: environment },
    BattleshipStore,
  ],
};
