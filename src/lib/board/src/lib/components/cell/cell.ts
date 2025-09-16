import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  Cell,
  CellBackgroundColors,
  CellColors,
} from '@osrs-battleship/shared';

@Component({
  selector: 'bs-cell',
  imports: [CommonModule],
  templateUrl: './cell.html',
})
export class CellComponent {
  readonly cell = input.required<Cell>();

  readonly viewModel = computed(() => ({
    src: this.cell().src,
    description: this.cell().description,
    styles: this.styles(),
  }));

  readonly styles = computed(() => ({
    'background-color': CellBackgroundColors[this.cell().rarity],
    'border-color': CellColors[this.cell().rarity],
    color: CellColors[this.cell().rarity],
  }));
}
