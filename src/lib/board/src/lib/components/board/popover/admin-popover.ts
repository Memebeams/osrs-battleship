import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cell, CellRarity } from '@osrs-battleship/shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BoardStore } from '../../../store/board.store';

@Component({
  selector: 'bs-admin-popover',
  imports: [FormsModule, NzInputModule, NzSelectModule, NzButtonModule],
  templateUrl: './admin-popover.html',
})
export class AdminPopover implements OnInit {
  readonly store = inject(BoardStore);

  readonly cell = input.required<Cell>();
  readonly cellSaved = output<Cell>();
  readonly closeClicked = output<void>();

  readonly rarity = signal<CellRarity>(CellRarity.Common);
  readonly description = signal<string>('');
  readonly src = signal<string>('');

  readonly options = Object.entries(CellRarity).map(([key, value]) => ({
    label: key,
    value,
  }));

  ngOnInit(): void {
    this.rarity.set(this.cell().rarity);
    this.description.set(this.cell().description);
    this.src.set(this.cell().src);
  }

  save() {
    const updatedCell: Cell = {
      ...this.cell(),
      rarity: this.rarity(),
      description: this.description(),
      src: this.src(),
    };

    this.store.updateCell(updatedCell);
  }
}
