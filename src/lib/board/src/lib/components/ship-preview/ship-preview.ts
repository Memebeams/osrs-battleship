import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Ship } from '@osrs-battleship/shared';

@Component({
  selector: 'bs-ship-preview',
  imports: [CommonModule],
  templateUrl: './ship-preview.html',
  styleUrl: './ship-preview.css',
})
export class ShipPreview {
  readonly ship = input.required<Ship>();

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
