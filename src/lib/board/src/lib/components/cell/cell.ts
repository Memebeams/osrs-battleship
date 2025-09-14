import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'bs-cell',
  imports: [CommonModule],
  templateUrl: './cell.html',
})
export class Cell {
  readonly COLORS = [
    '#808080', // Common (darker grayish white)
    '#17B300', // Uncommon (slightly shifted towards seafoam green)
    '#0066CC', // Rare (slightly darker bright blue)
    '#8229BB', // Epic (darker purple)
    '#A35400', // Legendary (slightly dimmer orange)
  ];

  readonly BACKGROUND_COLORS = [
    '#141414', // Common (slightly darker gray)
    '#041F00', // Uncommon (slightly darker green)
    '#001A33', // Rare (darker blue)
    '#16001A', // Epic (slightly darker purple, less gray)
    '#1A1400', // Legendary (darker orange)
  ];

  private weightedRandomIndex(): number {
    const weights = [50, 40, 30, 20, 10]; // Higher weight means higher probability
    const cumulativeWeights = weights.map(
      (
        (sum) => (value) =>
          (sum += value)
      )(0)
    );
    const random =
      Math.random() * cumulativeWeights[cumulativeWeights.length - 1];
    return cumulativeWeights.findIndex((weight) => random < weight);
  }

  constructor() {
    this.index.set(this.weightedRandomIndex());
  }
  index = signal<number>(Math.floor(Math.random() * 5));

  styles = computed(() => ({
    //edge color and font color are color from index
    'background-color': this.BACKGROUND_COLORS[this.index()],
    'border-color': this.COLORS[this.index()],
    color: this.COLORS[this.index()],
  }));
}
