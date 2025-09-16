import { Ship, ShipSquare, rotateSquares } from '@osrs-battleship/shared';

export const shipTypes: Record<string, ShipSquare[][]> = {
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
  { name: 'Platform', squares: shipTypes['plus'] },
  { name: 'Trawler', squares: shipTypes['c'] },
  { name: 'Rowboat', squares: shipTypes['p'] },
  { name: 'Rowboat', squares: rotateSquares(shipTypes['p'], 2) },
  { name: 'Outrigger', squares: rotateSquares(shipTypes['t'], 3) },
  { name: 'Outrigger', squares: rotateSquares(shipTypes['t'], 1) },
  { name: 'Steamboat', squares: rotateSquares(shipTypes['t'], 0) },
  { name: 'Steamboat', squares: rotateSquares(shipTypes['t'], 0) },
  { name: 'Sailboat', squares: shipTypes['l'] },
  { name: 'Sailboat', squares: rotateSquares(shipTypes['l'], 1) },
  { name: 'Sailboat', squares: rotateSquares(shipTypes['l'], 2) },
  { name: 'Sailboat', squares: rotateSquares(shipTypes['l'], 3) },
  { name: 'Canoe', squares: shipTypes['line'] },
  { name: 'Canoe', squares: shipTypes['line'] },
  { name: 'Canoe', squares: rotateSquares(shipTypes['line'], 1) },
  { name: 'Canoe', squares: rotateSquares(shipTypes['line'], 1) },
];
