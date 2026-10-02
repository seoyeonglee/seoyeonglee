import test from "node:test";
import assert from "node:assert/strict";
import { buildContributionPools } from "../src/contributionPools.js";

test("splits uneven commitments into layered pools", () => {
  const pools = buildContributionPools([
    { id:"A", balance:0, committed:100, inactive:false, exhausted:true },
    { id:"B", balance:0, committed:200, inactive:false, exhausted:true },
    { id:"C", balance:700, committed:300, inactive:false, exhausted:false }
  ]);

  assert.deepEqual(pools, [
    { amount:300, eligiblePlayerIds:["A","B","C"] },
    { amount:200, eligiblePlayerIds:["B","C"] },
    { amount:100, eligiblePlayerIds:["C"] }
  ]);
});

test("inactive participant contributes value but is not eligible", () => {
  const pools = buildContributionPools([
    { id:"A", balance:0, committed:100, inactive:true, exhausted:true },
    { id:"B", balance:0, committed:100, inactive:false, exhausted:true }
  ]);

  assert.deepEqual(pools, [
    { amount:200, eligiblePlayerIds:["B"] }
  ]);
});
