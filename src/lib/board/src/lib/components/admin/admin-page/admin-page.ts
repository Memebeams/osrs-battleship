import { Component, inject, signal } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { BattleshipService } from '@osrs-battleship/shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { pipe, switchMap, tap } from 'rxjs';
import { BoardStore } from '../../../store/board.store';
import { BoardComponent } from '../../board/board';
import { Container } from '../../container/container';

@Component({
  selector: 'bs-admin-page',
  imports: [BoardComponent, NzButtonModule, Container, NzPopoverModule],
  providers: [BoardStore],
  templateUrl: './admin-page.html',
})
export class AdminPageComponent {
  readonly store = inject(BoardStore);
  readonly service = inject(BattleshipService);

  loading = signal<boolean>(false);
  confirmVisible = signal<boolean>(false);
  resetComplete = signal<boolean>(false);

  shuffle = rxMethod<void>(
    pipe(
      tap(() => {
        this.loading.set(true);
      }),
      switchMap(() =>
        this.service.shuffle().pipe(
          tapResponse({
            next: ({ board }) => {
              this.store.setBoard(board);
              this.loading.set(false);
            },
            error: (e) => {
              console.error(e);
              this.loading.set(false);
            },
          }),
        ),
      ),
    ),
  );

  resetClicked() {
    this.confirmVisible.set(true);
  }

  reset = rxMethod<void>(
    pipe(
      tap(() => {
        this.loading.set(true);
      }),
      switchMap(() =>
        this.service.reset().pipe(
          tapResponse({
            next: () => {
              this.loading.set(false);
              this.confirmVisible.set(false);
              this.resetComplete.set(true);
            },
            error: (e) => {
              this.loading.set(false);
            },
          }),
        ),
      ),
    ),
  );
}
