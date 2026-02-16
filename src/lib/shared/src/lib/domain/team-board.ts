import { Attack } from './attack';
import { TeamShip } from './ship';

export interface TeamBoard {
  ships: Record<string, TeamShip>;
  attacksOnTeam: Record<string, Attack>;
  attacksByTeam: Record<string, Attack>;
}
