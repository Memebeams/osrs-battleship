import { computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  BattleshipService,
  BattleshipStore,
  Cell,
  Ship,
} from '@osrs-battleship/shared';
import { shipSet } from '../mocks/mock-ships';

export interface BoardState {
  id: string | undefined;
  ships: Ship[];
}

export const initialState: BoardState = {
  id: undefined,
  ships: shipSet,
};

export const BoardStore = signalStore(
  withState(initialState),
  withProps(() => ({
    bsStore: inject(BattleshipStore),
    service: inject(BattleshipService),
  })),
  withProps((store) => ({
    board$: rxResource({
      params: () => {
        return store.bsStore.token() ?? undefined;
      },
      stream: () => store.service.getBoard(),
    }),
  })),
  withComputed((store) => ({
    cells: computed(() =>
      store.board$.hasValue()
        ? store.board$.value().board.cells
        : ([] as Cell[][])
    ),
    width: computed(() =>
      store.board$.hasValue() ? store.board$.value().board.width : 0
    ),
    height: computed(() =>
      store.board$.hasValue() ? store.board$.value().board.height : 0
    ),
  })),
  withMethods((store) => ({
    setId: (id: string) => {
      patchState(store, { id });
    },
  }))
);

export type BoardStore = typeof BoardStore;
