import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BattleshipStore } from '@osrs-battleship/shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BoardStore } from '../../store/board.store';
import { BoardComponent } from '../board/board';
import { Container } from '../container/container';
import { ShipPreview } from '../ship-preview/ship-preview';

@Component({
  selector: 'bs-board-page',
  imports: [
    ShipPreview,
    BoardComponent,
    NzRadioModule,
    NzButtonModule,
    FormsModule,
    Container,
  ],
  providers: [BoardStore],
  templateUrl: './board-page.html',
})
export class BoardPageComponent {
  readonly store = inject(BoardStore);
  readonly bsStore = inject(BattleshipStore);

  readonly allyShipsToShow = computed(() => {
    const isCaptain = this.bsStore.isCaptain();
    return this.store
      .teamShips()
      .filter((ship) => (isCaptain ? ship : !!ship.coords));
  });

  readonly asdf = effect(() => {
    console.log('---');
    console.log(this.allyShipsToShow());
  });

  readonly enemy = signal<boolean>(false);
}
