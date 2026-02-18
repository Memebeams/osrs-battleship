import { Component } from '@angular/core';

@Component({
  selector: 'bs-container',
  imports: [],
  templateUrl: './container.html',
  styles: `
    .board-background {
      background-image: url('https://oldschool.runescape.wiki/images/Gielinor_map_poster.png');
      background-size: cover;
      background-position: center;
    }

    .left-fade {
      opacity: 0.85;
      background: linear-gradient(
        to right,
        oklch(12.9% 0.042 264.695),
        rgba(0, 0, 0, 0)
      );
    }

    .right-fade {
      opacity: 0.85;
      background: linear-gradient(
        to left,
        oklch(12.9% 0.042 264.695),
        rgba(0, 0, 0, 0)
      );
    }
  `,
})
export class Container {}
