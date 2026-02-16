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
  styles: `
    .board-background {
      background-image: url('https://oldschool.runescape.wiki/images/Gielinor_map_poster.png');
      background-size: cover;
      background-position: center;
    }

    .left-fade {
      opacity: 0.85;
      background: linear-gradient(
        to right,
        oklch(12.9% 0.042 264.695),
        rgba(0, 0, 0, 0)
      );
    }

    .right-fade {
      opacity: 0.85;
      background: linear-gradient(
        to left,
        oklch(12.9% 0.042 264.695),
        rgba(0, 0, 0, 0)
      );
    }
  `,
  templateUrl: './board-page.html',
})
export class BoardPageComponent {
  readonly store = inject(BoardStore);

  readonly enemy = signal<boolean>(false);
}
