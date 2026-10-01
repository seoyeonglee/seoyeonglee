import test from "node:test";
import assert from "node:assert/strict";
import { assessPairRisk } from "../src/risk/collusion.js";

test("raises explainable signals for a high-risk pair", () => {
  const result = assessPairRisk({
    playerA: "A",
    playerB: "B",
    handsTogether: 50,
    suspiciousFoldsToCounterparty: 35,
    netChipTransfer: 8000,
    sharedIp: true,
    sharedDevice: true
  });

  assert.equal(result.score, 100);
  assert.equal(result.severity, "HIGH");
  assert.deepEqual(result.reasons, [
    "SHARED_DEVICE",
    "SHARED_IP",
    "HIGH_COPLAY_FREQUENCY",
    "ASYMMETRIC_FOLD_PATTERN",
    "LARGE_NET_CHIP_TRANSFER"
  ]);
});

test("keeps a low-signal pair low risk", () => {
  const result = assessPairRisk({
    playerA: "A",
    playerB: "C",
    handsTogether: 6,
    suspiciousFoldsToCounterparty: 1,
    netChipTransfer: 150,
    sharedIp: false,
    sharedDevice: false
  });

  assert.equal(result.score, 0);
  assert.equal(result.severity, "LOW");
  assert.deepEqual(result.reasons, []);
});