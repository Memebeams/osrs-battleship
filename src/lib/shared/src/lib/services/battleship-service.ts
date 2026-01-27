import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Board } from '../domain/board';
import { Config } from '../environments/config';

export interface BoardResponse {
  // shipTypes: Record<string, ShipSquare[][]>;
  // ships: Record<string, Ship[]>;
  board: Board;
  teamBoard: {
    ships: any[];
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
    return this.http.post<{ token: string }>(`${this.config.apiUrl}/login`, {
      password,
    });
  }

  getBoard() {
    return this.http.get<BoardResponse>(`${this.config.apiUrl}/board`);
  }
}
