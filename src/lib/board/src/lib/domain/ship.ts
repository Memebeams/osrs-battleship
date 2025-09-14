export enum ShipType {
  Plus = 'plus',
  Line = 'line',
  C = 'c',
  T = 't',
  P = 'p',
  L = 'l',
}

export interface ShipSquare {
  included: boolean; // number of 90 degree clockwise rotations
}

export interface Ship {
  squares: ShipSquare[][];
  name: string;
  coords?: { x: number; y: number };
}

export function rotateSquares(
  squares: ShipSquare[][],
  rotation: 0 | 1 | 2 | 3
): ShipSquare[][] {
  // Rotate the 2D array squares by 90 * rotation degrees
  const numRows = squares.length;
  const numCols = squares[0]?.length || 0;

  if (rotation === 0) {
    return squares;
  }

  const rotated: ShipSquare[][] = [];

  if (rotation === 1) {
    // 90 degrees clockwise
    for (let col = 0; col < numCols; col++) {
      rotated[col] = [];
      for (let row = numRows - 1; row >= 0; row--) {
        rotated[col].push(squares[row][col]);
      }
    }
  } else if (rotation === 2) {
    // 180 degrees
    for (let row = numRows - 1; row >= 0; row--) {
      rotated.push([...squares[row]].reverse());
    }
  } else if (rotation === 3) {
    // 270 degrees clockwise (or 90 degrees counterclockwise)
    for (let col = numCols - 1; col >= 0; col--) {
      rotated[numCols - 1 - col] = [];
      for (let row = 0; row < numRows; row++) {
        rotated[numCols - 1 - col].push(squares[row][col]);
      }
    }
  }

  return rotated;
}
