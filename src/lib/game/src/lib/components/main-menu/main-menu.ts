import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from '@osrs-battleship/shared';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { BattleshipStore } from 'src/lib/shared/src/lib/store/battleship.store';

@Component({
  selector: 'bs-main-menu',
  imports: [
    NzLayoutModule,
    NzFormModule,
    NzTypographyModule,
    NzButtonModule,
    FormsModule,
    NzAlertModule,
  ],
  templateUrl: './main-menu.html',
})
export class MainMenu {
  readonly password = signal('');
  readonly store = inject(BattleshipStore);
  readonly router = inject(Router);

  readonly viewModel = computed(() => ({
    loading: this.store.loginStatus() === RequestStatus.PENDING,
    failed: this.store.loginStatus() === RequestStatus.ERROR,
  }));

  login() {
    this.store.login(this.password());
  }

  preview() {
    this.router.navigate(['/preview']);
  }
}
