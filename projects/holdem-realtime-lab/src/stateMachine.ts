export type Street = "WAITING" | "PREFLOP" | "FLOP" | "TURN" | "RIVER" | "SHOWDOWN" | "COMPLETE";

const NEXT: Record<Street, Street> = {
  WAITING: "PREFLOP",
  PREFLOP: "FLOP",
  FLOP: "TURN",
  TURN: "RIVER",
  RIVER: "SHOWDOWN",
  SHOWDOWN: "COMPLETE",
  COMPLETE: "WAITING"
};

export interface PlayerState {
  id: string;
  stack: number;
  committed: number;
  folded: boolean;
  allIn: boolean;
}

export interface TableState {
  handId: string;
  street: Street;
  pot: number;
  players: PlayerState[];
  actionSeq: number;
}

export function advanceStreet(state: TableState): TableState {
  return {
    ...state,
    street: NEXT[state.street],
    actionSeq: state.actionSeq + 1
  };
}

export function applyBet(state: TableState, playerId: string, amount: number): TableState {
  if (!Number.isInteger(amount) || amount <= 0) throw new Error("invalid bet amount");

  const players = state.players.map(player => {
    if (player.id !== playerId) return player;
    if (player.folded) throw new Error("folded player cannot bet");
    if (amount > player.stack) throw new Error("insufficient stack");

    const stack = player.stack - amount;
    return {
      ...player,
      stack,
      committed: player.committed + amount,
      allIn: stack === 0
    };
  });

  return {
    ...state,
    players,
    pot: state.pot + amount,
    actionSeq: state.actionSeq + 1
  };
}
