import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import {
  BattleshipStore,
  getCellKey,
  rotateSquares,
  TeamShip,
} from '@osrs-battleship/shared';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CaptainPopover } from './popover/captain-popover';

@Component({
  selector: 'bs-ship-preview',
  imports: [CommonModule, NzPopoverModule, CaptainPopover],
  templateUrl: './ship-preview.html',
})
export class ShipPreview {
  readonly ship = input.required<TeamShip>();

  readonly bsStore = inject(BattleshipStore);

  readonly isOpen = signal<boolean>(false);

  readonly squares = computed(() =>
    rotateSquares(this.ship().squares, this.ship().rotation),
  );

  readonly gridStyles = computed(() => ({
    'grid-template-columns': `repeat(${this.squares()[0].length}, 1fr)`,
    'grid-template-rows': `repeat(${this.squares().length}, 1fr)`,
  }));

  readonly styles = computed(() => {
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

        const key = getCellKey({ x: colIndex, y: rowIndex });
        const attack = this.ship().hits?.[key];
        const backgroundColor = attack
          ? 'rgba(255, 0, 0, 0.5)'
          : 'rgba(211, 211, 211, 0.1)';
        const color = attack ? 'rgba(200, 0, 0, 1.0)' : 'grey';

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
          color,
          cursor: 'default',
          ...borders,
        };
      }),
    );
  });
}
