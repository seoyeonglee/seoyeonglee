export interface PairFeatures {
  playerA: string;
  playerB: string;
  handsTogether: number;
  suspiciousFoldsToCounterparty: number;
  netChipTransfer: number;
  sharedIp: boolean;
  sharedDevice: boolean;
}

export interface PairRiskAssessment {
  score: number;
  severity: "LOW" | "MEDIUM" | "HIGH";
  reasons: string[];
}

/**
 * Explainable collusion-risk feature prototype.
 *
 * This is intentionally a transparent rule model for portfolio use.
 * Thresholds are illustrative and are not copied from any employer or live poker platform.
 */
export function assessPairRisk(features: PairFeatures): PairRiskAssessment {
  let score = 0;
  const reasons: string[] = [];

  if (features.sharedDevice) {
    score += 35;
    reasons.push("SHARED_DEVICE");
  }

  if (features.sharedIp) {
    score += 20;
    reasons.push("SHARED_IP");
  }

  if (features.handsTogether >= 20) {
    score += 10;
    reasons.push("HIGH_COPLAY_FREQUENCY");
  }

  if (
    features.handsTogether >= 10 &&
    features.suspiciousFoldsToCounterparty / features.handsTogether >= 0.6
  ) {
    score += 25;
    reasons.push("ASYMMETRIC_FOLD_PATTERN");
  }

  if (Math.abs(features.netChipTransfer) >= 5000) {
    score += 20;
    reasons.push("LARGE_NET_CHIP_TRANSFER");
  }

  score = Math.min(score, 100);
  const severity = score >= 70 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW";

  return { score, severity, reasons };
}