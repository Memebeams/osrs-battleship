import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cell } from '../cell/cell';
import { Ship } from '../ship/ship';

@Component({
  selector: 'bs-board',
  imports: [CommonModule, Cell, Ship],
  templateUrl: './board.html',
  styles: `
    .board-grid {
      grid-template-columns: 40px repeat(20, 1fr) 40px;
      grid-template-rows: 40px repeat(20, 1fr) 40px;
    }
  `,
})
export class Board {
  readonly String = String;
}
