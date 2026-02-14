import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cell } from '@osrs-battleship/shared';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BoardStore } from '../../../store/board.store';

@Component({
  selector: 'bs-enemy-popover',
  imports: [FormsModule, NzInputModule, NzButtonComponent],
  templateUrl: './enemy-popover.html',
})
export class EnemyPopover {
  readonly store = inject(BoardStore);

  readonly cell = input.required<Cell>();
  readonly closeClicked = output<void>();

  readonly rsn = signal<string>('');

  claim() {
    this.store.attack({ x: this.cell().x, y: this.cell().y, rsn: this.rsn() });
  }
}
