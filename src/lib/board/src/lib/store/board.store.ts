import { computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { signalStore, withComputed, withProps } from '@ngrx/signals';
import {
  BattleshipService,
  Cell,
  Ship,
  ShipType,
} from '@osrs-battleship/shared';

export const BoardStore = signalStore(
  withProps(() => ({
    service: inject(BattleshipService),
  })),
  withProps((store) => ({
    boardRequest$: rxResource({
      stream: () => store.service.getBoard(),
    }),
  })),
  withComputed((store) => ({
    board: computed(() =>
      store.boardRequest$.hasValue()
        ? store.boardRequest$.value().board
        : undefined
    ),
    shipTypes: computed<Partial<Record<ShipType, Ship>>>(() =>
      store.boardRequest$.hasValue()
        ? store.boardRequest$.value().shipTypes
        : {}
    ),
  })),
  withComputed((store) => ({
    cells: computed(() => store.board()?.cells ?? ([] as Cell[][])),
    width: computed(() => store.board()?.width ?? 0),
    height: computed(() => store.board()?.height ?? 0),
    ships: computed(() => {
      const ships = store.board()?.ships;
      return Object.values(ShipType).reduce<Ship[]>((acc, shipType) => {
        const shipCount = ships?.[shipType];
        const ship = store.shipTypes()[shipType];
        if (shipCount && ship) {
          for (let i = 0; i < shipCount; i++) {
            acc.push({ ...ship, id: `${shipType}-${i}` });
          }
        }
        return acc;
      }, []);
    }),
  }))
);

export type BoardStore = typeof BoardStore;
