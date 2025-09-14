import { computed } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { shipSet } from '../constants/mock-ships';
import { Ship } from '../domain/ship';

export interface BoardState {
  width: number;
  height: number;
  ships: Ship[];
}

export const initialState: BoardState = {
  width: 20,
  height: 20,
  ships: shipSet,
};

export const BoardStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    randomShips: computed(() =>
      store.ships().map((ship) => ({
        ...ship,
        coords: {
          x:
            Math.floor(
              Math.random() * (store.width() - ship.squares[0].length)
            ) + 1,
          y:
            Math.floor(Math.random() * (store.height() - ship.squares.length)) +
            1,
        },
      }))
    ),
  }))
);

export type BoardStore = typeof BoardStore;
