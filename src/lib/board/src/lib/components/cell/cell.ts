import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import {
  Cell,
  CellBackgroundColors,
  CellColors,
  ClaimedCellBackgroundColors,
  ClaimedCellColors,
} from '@osrs-battleship/shared';
import { BoardStore } from '../../store/board.store';

@Component({
  selector: 'bs-cell',
  imports: [CommonModule],
  templateUrl: './cell.html',
})
export class CellComponent {
  readonly store = inject(BoardStore);
  readonly cell = input.required<Cell>();

  readonly viewModel = computed(() => ({
    src: this.getSrc(),
    description: this.cell().description,
    styles: this.styles(),
  }));

  readonly styles = computed(() => ({
    'background-color': this.getBackgroundColor(),
    'border-color': this.getColor(),
    'border-width': '2px',
    color: this.getColor(),
    opacity: this.cell().state === 'miss' ? 0.75 : 1.0,
  }));

  getSrc() {
    if (this.cell().state === 'hit') {
      return this.store.boardRequest$.value()?.hitSrc;
    } else if (this.cell().state === 'miss') {
      return this.store.boardRequest$.value()?.missSrc;
    } else {
      return this.cell().src;
    }
  }

  getBackgroundColor() {
    if (this.cell().state === 'hit') {
      return ClaimedCellBackgroundColors['hit'];
    } else if (this.cell().state === 'miss') {
      return ClaimedCellBackgroundColors['miss'];
    } else {
      return CellBackgroundColors[this.cell().rarity];
    }
  }

  getColor() {
    if (this.cell().state === 'hit') {
      return ClaimedCellColors['hit'];
    } else if (this.cell().state === 'miss') {
      return ClaimedCellColors['miss'];
    } else {
      return CellColors[this.cell().rarity];
    }
  }
}
