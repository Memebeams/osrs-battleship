import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Board } from '../domain/board';
import { Cell } from '../domain/cell';
import { Ship, ShipType, TeamShip } from '../domain/ship';
import { Config } from '../environments/config';

export interface BoardResponse {
  shipTypes: { [key in ShipType]: Ship };
  board: Board;
  teamBoard: {
    ships: Record<string, TeamShip>;
  };
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
}
