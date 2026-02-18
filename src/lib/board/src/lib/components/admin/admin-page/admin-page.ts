import { Component, inject, signal } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { BattleshipService } from '@osrs-battleship/shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { pipe, switchMap, tap } from 'rxjs';
import { BoardStore } from '../../../store/board.store';
import { BoardComponent } from '../../board/board';

@Component({
  selector: 'bs-admin-page',
  imports: [BoardComponent, NzButtonModule],
  providers: [BoardStore],
  templateUrl: './admin-page.html',
})
export class AdminPageComponent {
  readonly store = inject(BoardStore);
  readonly service = inject(BattleshipService);

  loading = signal<boolean>(false);

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
            error: () => {
              this.loading.set(false);
            },
          }),
        ),
      ),
    ),
  );
}
