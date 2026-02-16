import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import {
  Cell,
  getCellKey,
  getCenter,
  rotateSquares,
  TeamShip,
} from '@osrs-battleship/shared';
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

  readonly enemy = input<boolean>(false);

  readonly viewModel = computed(() => ({
    width: this.store.width(),
    height: this.store.height(),
    cells: this.cellsWithState(),
    ships: this.store.teamShips(),
  }));

  readonly cellsWithState = computed(() => {
    const attacks = this.enemy()
      ? (this.store.teamBoard()?.attacksByTeam ?? {})
      : (this.store.teamBoard()?.attacksOnTeam ?? {});

    return this.store.cells().map((row) =>
      row.map((cell): Cell => {
        const attack = attacks[getCellKey(cell)];
        return attack
          ? {
              ...cell,
              state: attack.hit ? 'hit' : 'miss',
              attacker: attack.rsn,
            }
          : cell;
      }),
    );
  });

  boardStyles = computed(() => ({
    'grid-template-columns': `40px repeat(${this.store.width()}, 1fr) 40px`,
    'grid-template-rows': `40px repeat(${this.store.height()}, 1fr) 40px`,
  }));

  getShipStyles(ship: TeamShip) {
    const y = ship.coords?.y ?? 1;
    const x = ship.coords?.x ?? 1;
    const centerOffset = getCenter(rotateSquares(ship.squares, ship.rotation));
    return {
      top: `calc(100% * ${y - centerOffset.y} / ${this.store.height()})`,
      left: `calc(100% * ${x - centerOffset.x} / ${this.store.width()})`,
    };
  }
}
