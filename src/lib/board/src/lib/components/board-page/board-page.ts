import { Component, inject } from '@angular/core';
import { BoardStore } from '../../store/board.store';
import { BoardComponent } from "../board/board";
import { ShipPreview } from '../ship-preview/ship-preview';

@Component({
  selector: 'bs-board-page',
  imports: [ShipPreview, BoardComponent],
  providers: [BoardStore],
  templateUrl: './board-page.html',
})
export class BoardPageComponent {
  readonly store = inject(BoardStore);
}
