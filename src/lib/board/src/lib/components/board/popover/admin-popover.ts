import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cell, CellRarity } from '@osrs-battleship/shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BoardStore } from '../../../store/board.store';
import { AdminAttack, Attack } from 'src/lib/shared/src/lib/domain/attack';

@Component({
  selector: 'bs-admin-popover',
  imports: [FormsModule, NzInputModule, NzSelectModule, NzButtonModule],
  templateUrl: './admin-popover.html',
})
export class AdminPopover implements OnInit {
  readonly store = inject(BoardStore);

  readonly cell = input.required<Cell>();
  readonly cellSaved = output<Cell>();
  readonly closeClicked = output<void>();

  readonly rarity = signal<CellRarity>(CellRarity.Common);
  readonly description = signal<string>('');
  readonly src = signal<string>('');

  readonly rsns = signal<Record<string, string>>({});
  readonly attacks = computed(() => {
    const teamBoards = this.store.teamBoards();
    if (!teamBoards) {
      return {};
    }

    const cellKey = `${this.cell().x},${this.cell().y}`;
    const attacks: Record<string, Attack> = {};
    for (const [team, teamBoard] of Object.entries(teamBoards)) {
      const attack = teamBoard.attacksByTeam[cellKey];
      if (attack) {
        attacks[team] = attack;
      }
    }
    return attacks;
  });

  readonly options = Object.entries(CellRarity).map(([key, value]) => ({
    label: key,
    value,
  }));

  ngOnInit(): void {
    this.rarity.set(this.cell().rarity);
    this.description.set(this.cell().description);
    this.src.set(this.cell().src);

    const teamBoards = this.store.teamBoards();
    if (teamBoards) {
      const cellKey = `${this.cell().x},${this.cell().y}`;
      for (const [team, teamBoard] of Object.entries(teamBoards)) {
        const attack = teamBoard.attacksByTeam[cellKey];
        if (attack) {
          this.rsns.update((rsns) => ({
            ...rsns,
            [team]: attack.rsn,
          }));
        }
      }
    }
  }

  rsnChanged(team: string, rsn: string) {
    this.rsns.update((rsns) => ({
      ...rsns,
      [team]: rsn,
    }));
  }

  save() {
    const updatedCell: Cell = {
      ...this.cell(),
      rarity: this.rarity(),
      description: this.description(),
      src: this.src(),
    };

    this.store.updateCell(updatedCell);
  }

  attack(team: string) {
    const cell = this.cell();
    const attack: AdminAttack = {
      x: cell.x,
      y: cell.y,
      rsn: this.rsns()[team] || 'Admin',
      attackingTeam: team,
    };
    this.store.adminAttack(attack);
  }

  clear(team: string) {
    const cell = this.cell();
    this.store.clearAttack({
      x: cell.x,
      y: cell.y,
      teamId: team,
    });
  }
}
