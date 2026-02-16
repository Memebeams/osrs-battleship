import { Attack } from './attack';
import { TeamShip } from './ship';

export interface TeamBoard {
  ships: Record<string, TeamShip>;
  enemyShipsSunk: Record<string, TeamShip>;
  attacksOnTeam: Record<string, Attack>;
  attacksByTeam: Record<string, Attack>;
}

export const ShipBackgroundColors: Record<string, string> = {
  default: 'rgba(211, 211, 211, 0.1)',
  hit: 'rgba(255, 0, 0, 0.5)',
};

export const ShipColors: Record<string, string> = {
  default: 'grey',
  hit: 'rgba(200, 0, 0, 1.0)',
};
