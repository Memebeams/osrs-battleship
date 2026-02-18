import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Attack } from '../domain/attack';
import { Board } from '../domain/board';
import { Cell } from '../domain/cell';
import { Ship, ShipType, TeamShip } from '../domain/ship';
import { TeamBoard } from '../domain/team-board';
import { Config } from '../environments/config';

export interface BoardResponse {
  shipTypes: { [key in ShipType]: Ship };
  cutOffDate: string;
  board: Board;
  teamBoard: TeamBoard;
  hitSrc: string;
  missSrc: string;
}

export interface LoginResponse {
  boardId: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class BattleshipService {
  readonly http = inject(HttpClient);
  readonly config = inject(Config);

  login(password: string) {
    return this.http.post<{
      token: string;
      isAdmin?: boolean;
      isCaptain?: boolean;
    }>(`${this.config.apiUrl}/login`, {
      password,
    });
  }

  getBoard() {
    return this.http.get<BoardResponse>(`${this.config.apiUrl}/board`);
  }

  updateCell(cell: Cell) {
    return this.http.put<Cell>(`${this.config.apiUrl}/admin/cell`, cell);
  }

  updateShip(ship: TeamShip) {
    return this.http.put<TeamShip>(`${this.config.apiUrl}/ship`, ship);
  }

  attack(attack: Attack) {
    return this.http.post<{
      attack: Attack;
      enemyShipsSunk: Record<string, TeamShip>;
    }>(`${this.config.apiUrl}/attack`, attack);
  }

  shuffle() {
    return this.http.post<{ board: Board }>(
      `${this.config.apiUrl}/admin/shuffle`,
      {},
    );
  }

  reset() {
    return this.http.post(
      `${this.config.apiUrl}/admin/reset`,
      {},
      { responseType: 'text' },
    );
  }
}
