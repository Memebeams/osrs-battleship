import { Cell } from './cell';

export interface Board {
  id: string;
  width: number;
  height: number;
  cells: Cell[][];
}
