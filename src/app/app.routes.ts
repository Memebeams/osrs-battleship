import { Route } from '@angular/router';
import {
  authGuard,
  redirectAdminsToAdminPage,
  redirectNonAdminsToBoard,
} from '@osrs-battleship/shared';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@osrs-battleship/game').then((m) => m.MainMenu),
  },
  {
    path: 'board',
    canMatch: [authGuard, redirectAdminsToAdminPage],
    loadComponent: () =>
      import('@osrs-battleship/board').then((m) => m.BoardPageComponent),
  },
  {
    path: 'admin',
    canMatch: [authGuard, redirectNonAdminsToBoard],
    loadComponent: () =>
      import('@osrs-battleship/board').then((m) => m.AdminPageComponent),
  },
];
