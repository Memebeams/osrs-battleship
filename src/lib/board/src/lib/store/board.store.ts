import { computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  BattleshipService,
  Board,
  Cell,
  Ship,
  ShipType,
} from '@osrs-battleship/shared';
import { pipe, switchMap, tap } from 'rxjs';

export const BoardStore = signalStore(
  withState<{ board: Board | undefined }>({ board: undefined }),
  withProps(() => ({
    service: inject(BattleshipService),
  })),
  withProps((store) => ({
    boardRequest$: rxResource({
      stream: () => store.service.getBoard(),
    }),
  })),
  withComputed((store) => ({
    board$: computed(() =>
      store.boardRequest$.hasValue()
        ? store.boardRequest$.value().board
        : undefined,
    ),
    shipTypes: computed<Partial<Record<ShipType, Ship>>>(() =>
      store.boardRequest$.hasValue()
        ? store.boardRequest$.value().shipTypes
        : {},
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
  })),
  withMethods((store) => ({
    setBoard: rxMethod<Board | undefined>(
      pipe(tap((board: Board | undefined) => patchState(store, { board }))),
    ),
    updateCell: rxMethod<Cell>(
      pipe(
        switchMap((cell) => store.service.updateCell(cell)),
        tapResponse({
          next: (updatedCell: Cell) => {
            patchState(store, (state) => {
              if (!state.board) return state;
              const cells = state.board.cells.map((row) =>
                row.map((cell) => ({ ...cell })),
              );
              cells[updatedCell.y][updatedCell.x] = updatedCell;
              return { board: { ...state.board, cells } };
            });
          },
          error: (err) => {
            console.error('Error updating cell:', err);
          },
        }),
      ),
    ),
  })),
  withHooks({
    onInit: (store) => {
      store.setBoard(store.board$);
    },
  }),
);

export type BoardStore = typeof BoardStore;
