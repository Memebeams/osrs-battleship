import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Ship } from '../../domain/ship';
import { BoardStore } from '../../store/board.store';
import { Cell } from '../cell/cell';
import { ShipOverlay } from '../ship-overlay/ship-overlay';

@Component({
  selector: 'bs-board',
  imports: [CommonModule, Cell, ShipOverlay],
  providers: [BoardStore],
  templateUrl: './board.html',
})
export class Board {
  readonly String = String;

  readonly store = inject(BoardStore);

  boardStyles = computed(() => ({
    'grid-template-columns': `40px repeat(${this.store.width()}, 1fr) 40px`,
    'grid-template-rows': `40px repeat(${this.store.height()}, 1fr) 40px`,
  }));

  getShipStyles(ship: Ship) {
    return {
      top: `calc(100% * ${ship.coords?.y ?? 1} / ${this.store.height()})`,
      left: `calc(100% * ${ship.coords?.x ?? 1}/ ${this.store.width()})`,
    };
  }
}
