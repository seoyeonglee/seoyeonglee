import type { PlayerState } from "./stateMachine.js";

export interface ContributionPool {
  amount: number;
  eligiblePlayerIds: string[];
}

/**
 * Splits uneven player commitments into settlement pools.
 * Applicable to table-game or pooled-stake mechanics where participants
 * contribute different capped amounts.
 */
export function buildContributionPools(players: PlayerState[]): ContributionPool[] {
  const levels = [...new Set(players.map(p => p.committed).filter(v => v > 0))].sort((a,b) => a-b);
  const pools: ContributionPool[] = [];
  let previous = 0;

  for (const level of levels) {
    const contributors = players.filter(p => p.committed >= level);
    const increment = level - previous;
    const amount = increment * contributors.length;

    if (amount > 0) {
      pools.push({
        amount,
        eligiblePlayerIds: contributors.filter(p => !p.inactive).map(p => p.id)
      });
    }
    previous = level;
  }

  return pools;
}
