import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BattleshipStore } from '../store/battleship.store';

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const store = inject(BattleshipStore);

  if (store.token()) {
    req = req.clone({
      setHeaders: {
        token: `${store.token()}`,
      },
    });
  }
  return next(req);
}
