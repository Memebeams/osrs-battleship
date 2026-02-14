import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BoardStore } from '../../store/board.store';
import { BoardComponent } from '../board/board';
import { ShipPreview } from '../ship-preview/ship-preview';

@Component({
  selector: 'bs-board-page',
  imports: [
    ShipPreview,
    BoardComponent,
    NzRadioModule,
    NzButtonModule,
    FormsModule,
  ],
  providers: [BoardStore],
  templateUrl: './board-page.html',
})
export class BoardPageComponent {
  readonly store = inject(BoardStore);

  readonly enemy = signal<boolean>(false);
}
