export interface Attack {
  x: number;
  y: number;
  rsn: string;
  hit?: boolean;
}

export interface AdminAttack extends Attack {
  attackingTeam: string;
}
