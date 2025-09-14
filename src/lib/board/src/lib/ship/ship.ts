import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface ShipSquare {
  included: boolean;
  hit: boolean;
}

@Component({
  selector: 'bs-ship',
  imports: [CommonModule],
  templateUrl: './ship.html',
  styleUrl: './ship.css',
})
export class Ship {
  squares = signal<ShipSquare[][]>([]);

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

  constructor() {
    const squares = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => ({ included: false, hit: false }))
    );

    // Example: Mark some squares as part of the ship
    squares[0][1].included = true;
    squares[1][0].included = true;
    squares[1][1].included = true;
    squares[1][2].included = true;

    this.squares.set(squares);
  }
}
