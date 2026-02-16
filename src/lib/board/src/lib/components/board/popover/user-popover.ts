import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Cell, ClaimedCellColors } from '@osrs-battleship/shared';

@Component({
  selector: 'bs-user-popover',
  imports: [CommonModule],
  templateUrl: './user-popover.html',
})
export class UserPopover {
  readonly cell = input.required<Cell>();

  readonly hitStyles = {
    color: ClaimedCellColors.hit,
  };
}
