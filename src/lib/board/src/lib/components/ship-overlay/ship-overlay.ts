import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import {
  rotateSquares,
  ShipBackgroundColors,
  ShipColors,
  TeamShip,
} from '@osrs-battleship/shared';
import { BoardStore } from '../../store/board.store';

@Component({
  selector: 'bs-ship-overlay',
  imports: [CommonModule],
  templateUrl: './ship-overlay.html',
})
export class ShipOverlay {
  readonly store = inject(BoardStore);
  ship = input.required<TeamShip>();

  enemy = input(false);

  readonly squares = computed(() =>
    rotateSquares(this.ship().squares, this.ship().rotation),
  );

  readonly sunk = computed(() => {
    const ship = this.ship();
    const key = ship.id;

    if (ship.hits && ship.coords) {
      const totalHits = Object.keys(ship.hits).length;
      const totalSquares = ship.squares.reduce(
        (sum, row) => sum + row.filter((sq) => sq.included).length,
        0,
      );
      return totalHits >= totalSquares;
    }

    if (this.enemy()) {
      const teamBoard = this.store.teamBoard();
      if (!teamBoard) return false;
      return teamBoard.enemyShipsSunk?.[key] !== undefined;
    }

    return false;
  });

  gridStyles = computed(() => ({
    'grid-template-columns': `repeat(${this.squares()[0].length}, 1fr)`,
    'grid-template-rows': `repeat(${this.squares().length}, 1fr)`,
  }));

  styles = computed(() => {
    return this.squares().map((row, rowIndex) =>
      row.map((square, colIndex) => {
        if (!square.included) {
          return {};
        }

        const borders: { [key: string]: string } = {};
        const isEdgeOrNotIncluded = (r: number, c: number) =>
          r < 0 ||
          c < 0 ||
          r >= this.squares().length ||
          c >= row.length ||
          !this.squares()[r][c].included;

        const backgroundColor = this.sunk()
          ? ShipBackgroundColors['hit']
          : ShipBackgroundColors['default'];
        const color = this.sunk() ? ShipColors['hit'] : ShipColors['default'];

        if (isEdgeOrNotIncluded(rowIndex - 1, colIndex)) {
          borders['borderTop'] = `2px dashed ${color}`;
        }
        if (isEdgeOrNotIncluded(rowIndex + 1, colIndex)) {
          borders['borderBottom'] = `2px dashed ${color}`;
        }
        if (isEdgeOrNotIncluded(rowIndex, colIndex - 1)) {
          borders['borderLeft'] = `2px dashed ${color}`;
        }
        if (isEdgeOrNotIncluded(rowIndex, colIndex + 1)) {
          borders['borderRight'] = `2px dashed ${color}`;
        }

        return {
          backgroundColor,
          ...borders,
        };
      }),
    );
  });
}
