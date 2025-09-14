import { rotateSquares, Ship, ShipSquare, ShipType } from '../domain/ship';

export const shipTypes: Record<ShipType, ShipSquare[][]> = {
  plus: [
    [{ included: false }, { included: true }, { included: false }],
    [{ included: true }, { included: true }, { included: true }],
    [{ included: false }, { included: true }, { included: false }],
  ],
  line: [
    [{ included: true }],
    [{ included: true }],
    [{ included: true }],
    [{ included: true }],
  ],
  c: [
    [{ included: true }, { included: true }],
    [{ included: true }, { included: false }],
    [{ included: true }, { included: true }],
  ],
  t: [
    [{ included: true }, { included: true }, { included: true }],
    [{ included: false }, { included: true }, { included: false }],
  ],
  p: [
    [{ included: true }, { included: true }],
    [{ included: true }, { included: true }],
    [{ included: true }, { included: false }],
  ],
  l: [
    [{ included: true }, { included: false }],
    [{ included: true }, { included: false }],
    [{ included: true }, { included: true }],
  ],
};

export const shipSet: Ship[] = [
  { name: 'Platform', squares: shipTypes[ShipType.Plus] },
  { name: 'Trawler', squares: shipTypes[ShipType.C] },
  { name: 'Rowboat', squares: shipTypes[ShipType.P] },
  { name: 'Rowboat', squares: rotateSquares(shipTypes[ShipType.P], 2) },
  { name: 'Outrigger', squares: rotateSquares(shipTypes[ShipType.T], 3) },
  { name: 'Outrigger', squares: rotateSquares(shipTypes[ShipType.T], 1) },
  { name: 'Steamboat', squares: rotateSquares(shipTypes[ShipType.T], 0) },
  { name: 'Steamboat', squares: rotateSquares(shipTypes[ShipType.T], 0) },
  { name: 'Sailboat', squares: shipTypes[ShipType.L] },
  { name: 'Sailboat', squares: rotateSquares(shipTypes[ShipType.L], 1) },
  { name: 'Sailboat', squares: rotateSquares(shipTypes[ShipType.L], 2) },
  { name: 'Sailboat', squares: rotateSquares(shipTypes[ShipType.L], 3) },
  { name: 'Canoe', squares: shipTypes[ShipType.Line] },
  { name: 'Canoe', squares: shipTypes[ShipType.Line] },
  { name: 'Canoe', squares: rotateSquares(shipTypes[ShipType.Line], 1) },
  { name: 'Canoe', squares: rotateSquares(shipTypes[ShipType.Line], 1) },
];
