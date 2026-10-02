export type Phase =
  | "WAITING"
  | "ROUND_1"
  | "ROUND_2"
  | "ROUND_3"
  | "FINAL"
  | "SETTLEMENT"
  | "COMPLETE";

const NEXT: Record<Phase, Phase> = {
  WAITING: "ROUND_1",
  ROUND_1: "ROUND_2",
  ROUND_2: "ROUND_3",
  ROUND_3: "FINAL",
  FINAL: "SETTLEMENT",
  SETTLEMENT: "COMPLETE",
  COMPLETE: "WAITING"
};

export interface PlayerState {
  id: string;
  balance: number;
  committed: number;
  inactive: boolean;
  exhausted: boolean;
}

export interface MatchState {
  matchId: string;
  phase: Phase;
  pool: number;
  players: PlayerState[];
  actionSeq: number;
}

export function advancePhase(state: MatchState): MatchState {
  return {
    ...state,
    phase: NEXT[state.phase],
    actionSeq: state.actionSeq + 1
  };
}

export function commitValue(state: MatchState, playerId: string, amount: number): MatchState {
  if (!Number.isInteger(amount) || amount <= 0) throw new Error("invalid amount");

  const players = state.players.map(player => {
    if (player.id !== playerId) return player;
    if (player.inactive) throw new Error("inactive player cannot commit");
    if (amount > player.balance) throw new Error("insufficient balance");

    const balance = player.balance - amount;
    return {
      ...player,
      balance,
      committed: player.committed + amount,
      exhausted: balance === 0
    };
  });

  return {
    ...state,
    players,
    pool: state.pool + amount,
    actionSeq: state.actionSeq + 1
  };
}
