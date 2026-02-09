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
import { getCenter, rotateSquares, TeamShip } from '@osrs-battleship/shared';
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

  readonly squares = computed(() =>
    rotateSquares(this.ship().squares, this.ship().rotation),
  );
  readonly centerOffset = computed(() => getCenter(this.squares()));

  readonly yOptions = computed(() =>
    new Array(this.store.height() - (this.centerOffset().height - 1))
      .fill(undefined)
      .map((_, index) => ({
        label: `${index + 1 + this.centerOffset().y}`,
        value: index + this.centerOffset().y,
      })),
  );
  readonly xOptions = computed(() =>
    new Array(this.store.width() - (this.centerOffset().width - 1))
      .fill(undefined)
      .map((_, index) => ({
        label: `${String.fromCharCode(65 + index + this.centerOffset().x)}`,
        value: index + this.centerOffset().x,
      })),
  );

  ngOnInit(): void {
    const shipCoords = computed(() => this.ship().coords);
    this.setCoords(shipCoords);
    this.updateCoords(this.coords);
  }

  readonly setCoords = rxMethod<{ x: number; y: number } | undefined>(
    pipe(
      tap((coords: { x: number; y: number } | undefined) => {
        this.x.set(coords?.x);
        this.y.set(coords?.y);
      }),
    ),
  );

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

        if (updatedShip.coords) {
          const newRotation = rotateSquares(
            this.ship().squares,
            updatedShip.rotation,
          );
          const newCenter = getCenter(newRotation);
          const newXMin = newCenter.x;
          const newXMax = this.store.width() - newXMin - 1;
          const newYMin = newCenter.y;
          const newYMax = this.store.height() - newYMin - 1;

          if (updatedShip.coords.x < newXMin) {
            updatedShip.coords.x = newXMin;
          } else if (updatedShip.coords.x > newXMax) {
            updatedShip.coords.x = newXMax;
          } else if (updatedShip.coords.y < newYMin) {
            updatedShip.coords.y = newYMin;
          } else if (updatedShip.coords.y > newYMax) {
            updatedShip.coords.y = newYMax;
          }
        }

        this.store.updateShip(updatedShip);
      }),
    ),
  );
}
