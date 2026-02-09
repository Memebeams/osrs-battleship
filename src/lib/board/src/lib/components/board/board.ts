import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TeamShip } from '@osrs-battleship/shared';
import { BoardStore } from '../../store/board.store';
import { ShipOverlay } from '../ship-overlay/ship-overlay';
import { PopoverCell } from './popover-cell/popover-cell';

@Component({
  selector: 'bs-board',
  imports: [CommonModule, PopoverCell, ShipOverlay],
  templateUrl: './board.html',
})
export class BoardComponent {
  readonly String = String;

  readonly store = inject(BoardStore);

  readonly viewModel = computed(() => ({
    width: this.store.width(),
    height: this.store.height(),
    cells: this.store.cells(),
    ships: this.store.teamShips(),
  }));

  boardStyles = computed(() => ({
    'grid-template-columns': `40px repeat(${this.store.width()}, 1fr) 40px`,
    'grid-template-rows': `40px repeat(${this.store.height()}, 1fr) 40px`,
  }));

  getShipStyles(ship: TeamShip) {
    const y = ship.coords?.y ?? 1;
    const x = ship.coords?.x ?? 1;
    return {
      top: `calc(100% * ${y - 1} / ${this.store.height()})`,
      left: `calc(100% * ${x - 1} / ${this.store.width()})`,
    };
  }
}
