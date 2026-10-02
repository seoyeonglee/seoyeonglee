export interface PairFeatures {
  playerA: string;
  playerB: string;
  sessionsTogether: number;
  suspiciousConcessions: number;
  netValueTransfer: number;
  sharedIp: boolean;
  sharedDevice: boolean;
}

export interface PairRiskAssessment {
  score: number;
  severity: "LOW" | "MEDIUM" | "HIGH";
  reasons: string[];
}

/**
 * Transparent pair-level collusion-risk prototype.
 * Thresholds are illustrative and use synthetic assumptions only.
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
  if (features.sessionsTogether >= 20) {
    score += 10;
    reasons.push("HIGH_COPLAY_FREQUENCY");
  }
  if (
    features.sessionsTogether >= 10 &&
    features.suspiciousConcessions / features.sessionsTogether >= 0.6
  ) {
    score += 25;
    reasons.push("ASYMMETRIC_CONCESSION_PATTERN");
  }
  if (Math.abs(features.netValueTransfer) >= 5000) {
    score += 20;
    reasons.push("LARGE_NET_VALUE_TRANSFER");
  }

  score = Math.min(score, 100);
  const severity = score >= 70 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW";
  return { score, severity, reasons };
}
