import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BattleshipStore } from '../store/battleship.store';

export const redirectNonAdminsToBoard: CanActivateFn = () => {
  const store = inject(BattleshipStore);
  const router = inject(Router);
  return store.isAdmin() ? true : { redirectTo: router.parseUrl('/board') };
};

export const redirectAdminsToAdminPage: CanActivateFn = () => {
  const store = inject(BattleshipStore);
  const router = inject(Router);
  return store.isAdmin() ? { redirectTo: router.parseUrl('/admin') } : true;
};
