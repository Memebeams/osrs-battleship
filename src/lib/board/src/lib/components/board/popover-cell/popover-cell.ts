import {
  Component,
  computed,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { BattleshipStore, Cell } from '@osrs-battleship/shared';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CellComponent } from '../../cell/cell';
import { AdminPopover } from '../popover/admin-popover';
import { CaptainPopover } from '../popover/captain-popover';
import { UserPopover } from '../popover/user-popover';

@Component({
  selector: 'bs-popover-cell',
  imports: [
    AdminPopover,
    CaptainPopover,
    UserPopover,
    CellComponent,
    NzPopoverModule,
  ],
  templateUrl: './popover-cell.html',
})
export class PopoverCell {
  readonly bsStore = inject(BattleshipStore);

  readonly cell = input.required<Cell>();

  readonly isOpen = signal<boolean>(false);

  readonly popover = computed(() => {
    if (this.bsStore.isAdmin()) return this.adminTemplate();
    if (this.bsStore.isCaptain()) return this.captainTemplate();
    return this.userTemplate();
  });

  readonly adminTemplate = viewChild('adminPopover', { read: TemplateRef });
  readonly captainTemplate = viewChild('captainPopover', { read: TemplateRef });
  readonly userTemplate = viewChild('userPopover', { read: TemplateRef });
}
