import { Cell } from './cell';
import { ShipType } from './ship';

export interface Board {
  width: number;
  height: number;
  cells: Cell[][];
  ships: Record<ShipType, number>;
}
