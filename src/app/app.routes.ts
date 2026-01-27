import { Route } from '@angular/router';
import { authGuard } from '@osrs-battleship/shared';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@osrs-battleship/game').then((m) => m.MainMenu),
  },
  {
    path: 'board',
    canMatch: [authGuard],
    loadComponent: () =>
      import('@osrs-battleship/board').then((m) => m.BoardComponent),
  },
];
