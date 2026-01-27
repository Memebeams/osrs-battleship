import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BattleshipStore } from './store/battleship.store';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(BattleshipStore);
  if (store.token()) {
    return true;
  }

  const router = inject(Router);
  return router.createUrlTree(['']);
};
