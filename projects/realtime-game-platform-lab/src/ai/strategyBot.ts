export type Position = "EARLY" | "MIDDLE" | "LATE";
export type StrategyAction = "PASS" | "MATCH" | "COMMIT" | "INCREASE";

export interface StrategyContext {
  confidence: number;      // normalized 0..1
  costRatio: number;       // normalized 0..1
  position: Position;
  amountRequired: number;
  baseUnit: number;
  phase: "ROUND_1" | "ROUND_2" | "ROUND_3" | "FINAL";
}

export interface StrategyDecision {
  action: StrategyAction;
  sizingUnits?: number;
  reasons: string[];
}

/**
 * Explainable rule-based decision agent for a turn-based game.
 * This is a portfolio prototype, not a game-theory-optimal solver.
 */
export function decideAction(ctx: StrategyContext): StrategyDecision {
  const reasons: string[] = [];
  const lateBonus = ctx.position === "LATE" ? 0.08 : 0;
  const adjustedConfidence = Math.min(1, ctx.confidence + lateBonus);

  if (lateBonus > 0) reasons.push("LATE_POSITION_BONUS");

  if (ctx.amountRequired === 0) {
    if (adjustedConfidence >= 0.72) {
      reasons.push("HIGH_CONFIDENCE_COMMIT");
      return { action: "COMMIT", sizingUnits: ctx.phase === "ROUND_1" ? 3 : 2.5, reasons };
    }
    reasons.push("NO_COST_REQUIRED");
    return { action: "PASS", reasons };
  }

  if (adjustedConfidence >= 0.82) {
    reasons.push("PREMIUM_CONFIDENCE");
    return { action: "INCREASE", sizingUnits: 3.5, reasons };
  }

  if (adjustedConfidence >= ctx.costRatio + 0.12) {
    reasons.push("CONFIDENCE_EXCEEDS_COST_RATIO");
    return { action: "MATCH", reasons };
  }

  reasons.push("INSUFFICIENT_EXPECTED_VALUE_PROXY");
  return { action: "PASS", reasons };
}
