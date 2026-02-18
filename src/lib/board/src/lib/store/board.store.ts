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
  getCellKey,
  Ship,
  ShipType,
  TeamBoard,
  TeamShip,
} from '@osrs-battleship/shared';
import { pipe, switchMap, tap } from 'rxjs';
import { Attack } from 'src/lib/shared/src/lib/domain/attack';

export interface BoardState {
  board: Board | undefined;
  teamBoard: TeamBoard | undefined;
  updateInProgress: boolean;
}

export const initialState: BoardState = {
  board: undefined,
  teamBoard: undefined,
  updateInProgress: false,
};

export const BoardStore = signalStore(
  withState<BoardState>(initialState),
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
    teamBoard$: computed(() =>
      store.boardRequest$.hasValue()
        ? store.boardRequest$.value().teamBoard
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
      return Object.values(ShipType).reduce<TeamShip[]>((acc, shipType) => {
        const shipCount = ships?.[shipType];
        const ship = store.shipTypes()[shipType];
        if (shipCount && ship) {
          for (let i = 0; i < shipCount; i++) {
            acc.push({ ...ship, id: `${shipType}-${i}`, rotation: 0 });
          }
        }
        return acc;
      }, []);
    }),
  })),
  withComputed((store) => ({
    teamShips: computed(() =>
      store
        .ships()
        .map(
          (ship) =>
            store.teamBoard()?.ships[ship.id ?? ''] ?? (ship as TeamShip),
        ),
    ),
    enemyShipsSunk: computed(() => {
      const teamBoard = store.teamBoard();
      if (!teamBoard) return [];
      return Object.values(teamBoard.enemyShipsSunk ?? {});
    }),
  })),
  withMethods((store) => ({
    setBoard: rxMethod<Board | undefined>(
      pipe(tap((board: Board | undefined) => patchState(store, { board }))),
    ),
    setTeamBoard: rxMethod<TeamBoard | undefined>(
      pipe(
        tap((teamBoard: TeamBoard | undefined) =>
          patchState(store, { teamBoard }),
        ),
      ),
    ),
    updateCell: rxMethod<Cell>(
      pipe(
        tap(() => patchState(store, { updateInProgress: true })),
        switchMap((cell) => store.service.updateCell(cell)),
        tapResponse({
          next: (updatedCell: Cell) => {
            patchState(store, (state) => {
              if (!state.board) return state;
              const cells = state.board.cells.map((row) =>
                row.map((cell) => ({ ...cell })),
              );
              cells[updatedCell.y][updatedCell.x] = updatedCell;
              return {
                board: { ...state.board, cells },
                updateInProgress: false,
              };
            });
          },
          error: (err) => {
            patchState(store, { updateInProgress: false });
            console.error('Error updating cell:', err);
          },
        }),
      ),
    ),
    updateShip: rxMethod<TeamShip>(
      pipe(
        tap(() => patchState(store, { updateInProgress: true })),
        switchMap((ship) =>
          store.service.updateShip(ship).pipe(
            tapResponse({
              next: (updatedShip: TeamShip) => {
                patchState(store, (state) => {
                  if (!state.teamBoard) return { updateInProgress: false };
                  if (!updatedShip.id) return { updateInProgress: false };
                  const teamBoard = {
                    ...state.teamBoard,
                    ships: {
                      ...state.teamBoard.ships,
                      [updatedShip.id]: updatedShip,
                    },
                  };
                  return { teamBoard, updateInProgress: false };
                });
              },
              error: (err) => {
                patchState(store, { updateInProgress: false });
                console.error('Error updating ship:', err);
              },
            }),
          ),
        ),
      ),
    ),
    attack: rxMethod<Attack>(
      pipe(
        tap(() => patchState(store, { updateInProgress: true })),
        switchMap((attack) => store.service.attack(attack)),
        tapResponse({
          next: (response: {
            attack: Attack;
            enemyShipsSunk: Record<string, TeamShip>;
          }) => {
            const oldBoard = store.teamBoard();
            if (oldBoard) {
              const teamBoard = { ...oldBoard };
              teamBoard.attacksByTeam = {
                ...(teamBoard.attacksByTeam || {}),
                [getCellKey(response.attack)]: response.attack,
              };
              teamBoard.enemyShipsSunk = response.enemyShipsSunk;
              patchState(store, { teamBoard, updateInProgress: false });
            }
          },
          error: (err) => {
            patchState(store, { updateInProgress: false });
            console.error('Error performing attack:', err);
          },
        }),
      ),
    ),
  })),
  withHooks({
    onInit: (store) => {
      store.setBoard(store.board$);
      store.setTeamBoard(store.teamBoard$);
    },
  }),
);

export type BoardStore = typeof BoardStore;
