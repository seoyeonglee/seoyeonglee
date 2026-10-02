import test from "node:test";
import assert from "node:assert/strict";
import { assessPairRisk } from "../src/risk/collusion.js";

test("raises explainable signals for a high-risk pair", () => {
  const result = assessPairRisk({
    playerA: "A",
    playerB: "B",
    sessionsTogether: 50,
    suspiciousConcessions: 35,
    netValueTransfer: 8000,
    sharedIp: true,
    sharedDevice: true
  });

  assert.equal(result.score, 100);
  assert.equal(result.severity, "HIGH");
});

test("keeps a low-signal pair low risk", () => {
  const result = assessPairRisk({
    playerA: "A",
    playerB: "C",
    sessionsTogether: 6,
    suspiciousConcessions: 1,
    netValueTransfer: 150,
    sharedIp: false,
    sharedDevice: false
  });

  assert.equal(result.score, 0);
  assert.equal(result.severity, "LOW");
});
