import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { throwError } from 'rxjs';
import { RequestStatus } from '../domain/request-status';
import { BattleshipService } from '../services/battleship-service';

export interface BattleshipState {
  token: string | undefined;
  isAdmin: boolean;
  isCaptain: boolean;
  loginStatus: RequestStatus;
}

export const initialState: BattleshipState = {
  token: undefined,
  isAdmin: false,
  isCaptain: false,
  loginStatus: RequestStatus.INITIAL,
};

export const BattleshipStore = signalStore(
  withState(initialState),
  withProps(() => ({
    service: inject(BattleshipService),
    router: inject(Router),
  })),
  withMethods((store) => ({
    login: (password: string) => {
      patchState(store, { loginStatus: RequestStatus.PENDING });
      store.service.login(password).subscribe({
        next: (response) => {
          patchState(store, {
            token: response.token,
            isAdmin: response.isAdmin ?? false,
            isCaptain: response.isCaptain ?? false,
            loginStatus: RequestStatus.SUCCESS,
          });
          store.router.navigate(response.isAdmin ? ['/admin'] : ['/board']);
        },
        error: (error) => {
          patchState(store, { loginStatus: RequestStatus.ERROR });
          return throwError(() => error);
        },
      });
    },
  })),
);
