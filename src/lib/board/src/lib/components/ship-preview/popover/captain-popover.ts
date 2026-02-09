import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TeamShip } from '@osrs-battleship/shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { filter, pipe, tap } from 'rxjs';
import { BoardStore } from '../../../store/board.store';

@Component({
  selector: 'bs-captain-popover',
  imports: [FormsModule, NzButtonModule, NzSelectModule, NzIconModule],
  templateUrl: './captain-popover.html',
})
export class CaptainPopover implements OnInit {
  readonly store = inject(BoardStore);

  readonly ship = input.required<TeamShip>();
  readonly closeClicked = output<void>();

  readonly x = signal<number | undefined>(undefined);
  readonly y = signal<number | undefined>(undefined);
  readonly coords = computed(() => {
    const x = this.x();
    const y = this.y();
    return x !== undefined && y !== undefined ? { x, y } : undefined;
  });

  readonly yOptions = computed(() =>
    new Array(this.store.width() - 2).fill(undefined).map((_, index) => ({
      label: `${index + 2}`,
      value: index + 1,
    })),
  );
  readonly xOptions = computed(() =>
    new Array(this.store.height() - 2).fill(undefined).map((_, index) => ({
      label: `${String.fromCharCode(65 + index + 1)}`,
      value: index + 1,
    })),
  );

  ngOnInit(): void {
    this.x.set(this.ship().coords?.x);
    this.y.set(this.ship().coords?.y);
    this.updateCoords(this.coords);
  }

  readonly updateCoords = rxMethod<{ x: number; y: number } | undefined>(
    pipe(
      filter(Boolean),
      filter(
        (coords) =>
          coords.x !== this.ship().coords?.x ||
          coords.y !== this.ship().coords?.y,
      ),
      tap((coords: { x: number; y: number }) => {
        const updatedShip: TeamShip = {
          ...this.ship(),
          coords,
        };

        console.log('Updating ship coords to', coords);
        this.store.updateShip(updatedShip);
      }),
    ),
  );

  readonly rotate = rxMethod<void>(
    pipe(
      tap(() => {
        const updatedShip: TeamShip = {
          ...this.ship(),
          rotation: ((this.ship().rotation + 1) % 4) as 0 | 1 | 2 | 3,
        };

        this.store.updateShip(updatedShip);
      }),
    ),
  );
}
