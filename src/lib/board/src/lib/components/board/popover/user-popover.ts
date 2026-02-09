import { Component, input } from '@angular/core';
import { Cell } from '@osrs-battleship/shared';

@Component({
  selector: 'bs-user-popover',
  imports: [],
  templateUrl: './user-popover.html',
})
export class UserPopover {
  readonly cell = input.required<Cell>();
}
