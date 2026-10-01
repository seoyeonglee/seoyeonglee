import test from "node:test";
import assert from "node:assert/strict";
import { buildSidePots } from "../src/sidePots.js";

test("creates main and side pots for uneven all-ins", () => {
  const pots = buildSidePots([
    { id:"A", stack:0, committed:100, folded:false, allIn:true },
    { id:"B", stack:0, committed:200, folded:false, allIn:true },
    { id:"C", stack:700, committed:300, folded:false, allIn:false }
  ]);

  assert.deepEqual(pots, [
    { amount:300, eligiblePlayerIds:["A","B","C"] },
    { amount:200, eligiblePlayerIds:["B","C"] },
    { amount:100, eligiblePlayerIds:["C"] }
  ]);
});

test("folded chips stay in pot but player is not eligible", () => {
  const pots = buildSidePots([
    { id:"A", stack:0, committed:100, folded:true, allIn:true },
    { id:"B", stack:0, committed:100, folded:false, allIn:true }
  ]);

  assert.deepEqual(pots, [
    { amount:200, eligiblePlayerIds:["B"] }
  ]);
});
