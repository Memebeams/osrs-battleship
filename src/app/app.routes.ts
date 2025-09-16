import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@osrs-battleship/game').then((m) => m.MainMenu),
  },
  {
    path: 'board',
    loadComponent: () =>
      import('@osrs-battleship/board').then((m) => m.BoardComponent),
  },
];
