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
import { EnemyPopover } from '../popover/enemy-popover';
import { UserPopover } from '../popover/user-popover';

@Component({
  selector: 'bs-popover-cell',
  imports: [
    AdminPopover,
    UserPopover,
    EnemyPopover,
    CellComponent,
    NzPopoverModule,
  ],
  templateUrl: './popover-cell.html',
})
export class PopoverCell {
  readonly bsStore = inject(BattleshipStore);

  readonly cell = input.required<Cell>();

  readonly enemy = input<boolean>(false);

  readonly isOpen = signal<boolean>(false);

  readonly popover = computed(() => {
    if (this.bsStore.isAdmin()) {
      return this.adminTemplate();
    }

    if (this.enemy() && this.bsStore.isCaptain()) {
      return this.enemyTemplate();
    }

    return this.userTemplate();
  });

  readonly popoverTrigger = computed(() => {
    if (this.bsStore.isAdmin()) {
      return 'click';
    }

    if (this.enemy() && this.bsStore.isCaptain()) {
      return 'click';
    }

    return 'hover';
  });

  readonly adminTemplate = viewChild('adminPopover', { read: TemplateRef });
  readonly userTemplate = viewChild('userPopover', { read: TemplateRef });
  readonly enemyTemplate = viewChild('enemyPopover', { read: TemplateRef });
}
