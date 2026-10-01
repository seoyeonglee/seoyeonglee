export type Position = "EARLY" | "MIDDLE" | "LATE" | "BLIND";
export type BotAction = "FOLD" | "CHECK" | "CALL" | "BET" | "RAISE";

export interface BotContext {
  handStrength: number; // normalized 0..1
  potOdds: number;      // normalized 0..1
  position: Position;
  amountToCall: number;
  bigBlind: number;
  street: "PREFLOP" | "FLOP" | "TURN" | "RIVER";
}

export interface BotDecision {
  action: BotAction;
  sizingBb?: number;
  reasons: string[];
}

/**
 * Transparent rule-based practice bot.
 * This is a portfolio prototype, not a solver and not a claim of optimal poker strategy.
 */
export function decideAction(ctx: BotContext): BotDecision {
  const reasons: string[] = [];
  const lateBonus = ctx.position === "LATE" ? 0.08 : 0;
  const adjustedStrength = Math.min(1, ctx.handStrength + lateBonus);

  if (lateBonus > 0) reasons.push("LATE_POSITION_BONUS");

  if (ctx.amountToCall === 0) {
    if (adjustedStrength >= 0.72) {
      reasons.push("STRONG_HAND_VALUE_BET");
      return { action: "BET", sizingBb: ctx.street === "PREFLOP" ? 3 : 2.5, reasons };
    }
    reasons.push("NO_CALL_REQUIRED");
    return { action: "CHECK", reasons };
  }

  if (adjustedStrength >= 0.82) {
    reasons.push("PREMIUM_STRENGTH");
    return { action: "RAISE", sizingBb: 3.5, reasons };
  }

  if (adjustedStrength >= ctx.potOdds + 0.12) {
    reasons.push("STRENGTH_EXCEEDS_POT_ODDS");
    return { action: "CALL", reasons };
  }

  reasons.push("INSUFFICIENT_EQUITY_PROXY");
  return { action: "FOLD", reasons };
}
