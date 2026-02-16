export interface Cell {
  x: number;
  y: number;
  src: string;
  rarity: CellRarity;
  description: string;
  state?: 'hit' | 'miss';
  attacker?: string;
}

export enum CellRarity {
  Common = 'common',
  Uncommon = 'uncommon',
  Rare = 'rare',
  Epic = 'epic',
  Legendary = 'legendary',
}

export const CellColors: Record<CellRarity, string> = {
  [CellRarity.Common]: '#808080', // Common (darker grayish white)
  [CellRarity.Uncommon]: '#17B300', // Uncommon (slightly shifted towards seafoam green)
  [CellRarity.Rare]: '#0066CC', // Rare (slightly darker bright blue)
  [CellRarity.Epic]: '#8229BB', // Epic (darker purple)
  [CellRarity.Legendary]: '#A35400', // Legendary (slightly dimmer orange)
};

export const CellBackgroundColors: Record<CellRarity, string> = {
  [CellRarity.Common]: '#141414', // Common (slightly darker gray)
  [CellRarity.Uncommon]: '#041F00', // Uncommon (slightly darker green)
  [CellRarity.Rare]: '#001A33', // Rare (darker blue)
  [CellRarity.Epic]: '#16001A', // Epic (slightly darker purple, less gray)
  [CellRarity.Legendary]: '#1A1400', // Legendary (darker orange)
};

export const ClaimedCellColors: Record<'hit' | 'miss', string> = {
  hit: '#be0000ff', // Red for hit
  miss: '#ffffffff', // Gray for miss
};

export const ClaimedCellBackgroundColors: Record<'hit' | 'miss', string> = {
  hit: '#631010ff', // Dark red for hit
  miss: '#a7a7a7ff', // Dark gray for miss
};

export function getCellKey({ x, y }: { x: number; y: number }) {
  return `${x},${y}`;
}
