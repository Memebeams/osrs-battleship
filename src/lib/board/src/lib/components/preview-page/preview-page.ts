import { Component } from '@angular/core';
import { BoardStore } from '../../store/board.store';
import { BoardComponent } from '../board/board';
import { Container } from '../container/container';

@Component({
  selector: 'bs-preview-page',
  imports: [Container, BoardComponent],
  providers: [BoardStore],
  templateUrl: './preview-page.html',
})
export class PreviewPageComponent {}
