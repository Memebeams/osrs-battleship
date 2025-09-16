import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Ship } from '@osrs-battleship/shared';
import { BoardStore } from '../../store/board.store';

@Component({
  selector: 'bs-ship-overlay',
  imports: [CommonModule],
  templateUrl: './ship-overlay.html',
})
export class ShipOverlay {
  readonly store = inject(BoardStore);
  ship = input.required<Ship>();

  gridStyles = computed(() => ({
    'grid-template-columns': `repeat(${this.ship().squares[0].length}, 1fr)`,
    'grid-template-rows': `repeat(${this.ship().squares.length}, 1fr)`,
    top: `calc(${this.ship().coords?.y ?? 1} * 100%`,
    left: `calc(${this.ship().coords?.x ?? 1} * 100%`,
  }));

  styles = computed(() => {
    return this.ship().squares.map((row, rowIndex) =>
      row.map((square, colIndex) => {
        if (!square.included) {
          return {};
        }

        const borders: { [key: string]: string } = {};
        const isEdgeOrNotIncluded = (r: number, c: number) =>
          r < 0 ||
          c < 0 ||
          r >= this.ship().squares.length ||
          c >= row.length ||
          !this.ship().squares[r][c].included;

        if (isEdgeOrNotIncluded(rowIndex - 1, colIndex)) {
          borders['borderTop'] = '1px dashed lightgrey';
        }
        if (isEdgeOrNotIncluded(rowIndex + 1, colIndex)) {
          borders['borderBottom'] = '1px dashed lightgrey';
        }
        if (isEdgeOrNotIncluded(rowIndex, colIndex - 1)) {
          borders['borderLeft'] = '1px dashed lightgrey';
        }
        if (isEdgeOrNotIncluded(rowIndex, colIndex + 1)) {
          borders['borderRight'] = '1px dashed lightgrey';
        }

        return {
          backgroundColor: 'rgba(211, 211, 211, 0.1)', // Transparent light grey
          ...borders,
        };
      })
    );
  });
}
