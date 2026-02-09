import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { rotateSquares, TeamShip } from '@osrs-battleship/shared';
import { BoardStore } from '../../store/board.store';

@Component({
  selector: 'bs-ship-overlay',
  imports: [CommonModule],
  templateUrl: './ship-overlay.html',
})
export class ShipOverlay {
  readonly store = inject(BoardStore);
  ship = input.required<TeamShip>();

  readonly squares = computed(() =>
    rotateSquares(this.ship().squares, this.ship().rotation),
  );

  readonly top = computed(() => {
    const y = this.ship().coords?.y;
    return y ? y - 1 : 0;
  });

  readonly left = computed(() => {
    const y = this.ship().coords?.y;
    return y ? y - 1 : 0;
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

        if (isEdgeOrNotIncluded(rowIndex - 1, colIndex)) {
          borders['borderTop'] = '2px dashed grey';
        }
        if (isEdgeOrNotIncluded(rowIndex + 1, colIndex)) {
          borders['borderBottom'] = '2px dashed grey';
        }
        if (isEdgeOrNotIncluded(rowIndex, colIndex - 1)) {
          borders['borderLeft'] = '2px dashed grey';
        }
        if (isEdgeOrNotIncluded(rowIndex, colIndex + 1)) {
          borders['borderRight'] = '2px dashed grey';
        }

        return {
          backgroundColor: 'rgba(211, 211, 211, 0.1)', // Transparent light grey
          ...borders,
        };
      }),
    );
  });
}
