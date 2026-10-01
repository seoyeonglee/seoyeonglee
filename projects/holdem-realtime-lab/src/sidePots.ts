import type { PlayerState } from "./stateMachine.js";

export interface SidePot {
  amount: number;
  eligiblePlayerIds: string[];
}

/**
 * Builds main/side pots from committed chip amounts.
 * Folded players' chips remain in the pot, but folded players are not eligible to win.
 */
export function buildSidePots(players: PlayerState[]): SidePot[] {
  const levels = [...new Set(players.map(p => p.committed).filter(v => v > 0))].sort((a,b) => a-b);
  const pots: SidePot[] = [];
  let previous = 0;

  for (const level of levels) {
    const contributors = players.filter(p => p.committed >= level);
    const increment = level - previous;
    const amount = increment * contributors.length;

    if (amount > 0) {
      pots.push({
        amount,
        eligiblePlayerIds: contributors.filter(p => !p.folded).map(p => p.id)
      });
    }
    previous = level;
  }

  return pots;
}
