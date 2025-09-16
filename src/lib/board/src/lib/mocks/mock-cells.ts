import { Cell, CellRarity } from '@osrs-battleship/shared';

function weightedRandomIndex() {
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

function randomRarity(): CellRarity {
  const rarities = [
    CellRarity.Common,
    CellRarity.Uncommon,
    CellRarity.Rare,
    CellRarity.Epic,
    CellRarity.Legendary,
  ];
  return rarities[weightedRandomIndex()];
}

export function generateMockCells(width: number, height: number) {
  const cells = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const cell: Cell = {
        x,
        y,
        src: 'https://oldschool.runescape.wiki/images/Dragon_scimitar.png',
        description: `Cell at (${x}, ${y})`,
        rarity: randomRarity(),
      };
      row.push(cell);
    }
    cells.push(row);
  }
  return cells;
}
