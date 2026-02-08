import { Component } from '@angular/core';
import { BoardStore } from '../../../store/board.store';
import { BoardComponent } from '../../board/board';

@Component({
  selector: 'bs-admin-page',
  imports: [BoardComponent],
  providers: [BoardStore],
  templateUrl: './admin-page.html',
})
export class AdminPageComponent {}
