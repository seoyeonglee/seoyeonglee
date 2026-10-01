import test from "node:test";
import assert from "node:assert/strict";
import { decideAction } from "../src/ai/ruleBot.js";

test("raises with premium strength", () => {
  const result = decideAction({
    handStrength: 0.9,
    potOdds: 0.3,
    position: "MIDDLE",
    amountToCall: 40,
    bigBlind: 20,
    street: "FLOP"
  });
  assert.equal(result.action, "RAISE");
  assert.ok(result.reasons.includes("PREMIUM_STRENGTH"));
});

test("late position can widen an otherwise marginal call", () => {
  const result = decideAction({
    handStrength: 0.49,
    potOdds: 0.42,
    position: "LATE",
    amountToCall: 20,
    bigBlind: 20,
    street: "TURN"
  });
  assert.equal(result.action, "CALL");
  assert.ok(result.reasons.includes("LATE_POSITION_BONUS"));
});
