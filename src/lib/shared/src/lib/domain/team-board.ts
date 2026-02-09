import { TeamShip } from './ship';

export interface TeamBoard {
  ships: Record<string, TeamShip>;
}
