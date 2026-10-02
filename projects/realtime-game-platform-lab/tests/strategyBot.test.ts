import test from "node:test";
import assert from "node:assert/strict";
import { decideAction } from "../src/ai/strategyBot.js";

test("increases commitment with premium confidence", () => {
  const result = decideAction({
    confidence: 0.9,
    costRatio: 0.3,
    position: "MIDDLE",
    amountRequired: 40,
    baseUnit: 20,
    phase: "ROUND_2"
  });
  assert.equal(result.action, "INCREASE");
});

test("late position can widen a marginal match decision", () => {
  const result = decideAction({
    confidence: 0.49,
    costRatio: 0.42,
    position: "LATE",
    amountRequired: 20,
    baseUnit: 20,
    phase: "ROUND_3"
  });
  assert.equal(result.action, "MATCH");
});
