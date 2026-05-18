export type ShariaStatus = "halal" | "haram" | "doubtful";
export type ConfidenceLevel = "high" | "medium" | "low";
export type BadgeType = "halal_certified" | "haram" | "review_required";

export interface CoinVerdict {
  coin: string;
  ticker: string;
  status: ShariaStatus;
  confidence: ConfidenceLevel;
  reasoning: string[];
  badge: BadgeType;
  certified_by: string | null;
  last_updated: string;
  score: number;
}

export function analyzeCoin(name: string, symbol: string): CoinVerdict {
  const t = symbol.toUpperCase();
  const n = name.toLowerCase();
  const now = new Date().toISOString();
  
  let score = 0;
  const reasoning: string[] = [];
  
  // Base weights
  let hasUtility = false;
  let noRiba = true;
  let noMaysir = true;
  let noHaramIndustry = true;
  let isTransparent = true;
  
  let certifiedBy: string | null = null;
  let forceHalal = false;
  let forceHaram = false;

  // ---------------------------------------------------------
  // 1. EVALUATE AGAINST CONSENSUS & INSTITUTIONAL RULES
  // ---------------------------------------------------------

  // SC Malaysia Shariah Advisory Council & Amanie Advisors:
  // Major Layer 1s have real utility as digital commodities/infrastructure
  const layer1 = ['BTC', 'ETH', 'SOL', 'ADA', 'BNB', 'XLM', 'DOT'];
  if (layer1.includes(t)) {
    hasUtility = true;
    reasoning.push('SC Malaysia / Amanie Advisors: Recognized as a digital asset with real network utility.');
  }

  // Shariah Review Bureau (SRB): Stellar (XLM) certification
  if (t === 'XLM') {
    certifiedBy = 'Shariah Review Bureau';
    forceHalal = true;
    reasoning.push('SRB: Officially certified as Sharia compliant (2018) for its network utility and lack of riba.');
  }

  // Amanie Advisors: Binance Earn certification for specific assets
  if (['BNB', 'ETH', 'SOL'].includes(t)) {
    if (!certifiedBy) certifiedBy = 'Amanie Advisors';
    forceHalal = true;
    reasoning.push('Amanie Advisors: Endorsed under staking and blockchain ecosystem utility.');
  }
  
  // MUI Indonesia / HAQQ Network: Islamic Coin (ISLM)
  if (t === 'ISLM') {
    hasUtility = true;
    forceHalal = true;
    certifiedBy = 'MUI Indonesia';
    reasoning.push('MUI Indonesia: Explicitly built for Islamic finance, governed by Sharia boards.');
  }

  // Egypt Dar Al-Ifta & MUI Indonesia: Bitcoin Prohibitions (Disputed)
  if (t === 'BTC') {
    hasUtility = false; // Override to reduce score for dispute
    reasoning.push('Egypt Dar Al-Ifta & MUI Indonesia: Prohibited due to lack of central state backing and high volatility.');
    reasoning.push('Saudi Clerics & IFG: Permitted as digital property (Maal). (Result = Doubtful)');
    isTransparent = true; 
  }

  // IFG / Zoya Methodology: DeFi Lending Protocols
  const defiLending = ['UNI', 'AAVE', 'MKR', 'CRV', 'COMP'];
  if (defiLending.includes(t)) {
    noRiba = false; // Fails Riba test
    reasoning.push('IFG & Zoya: Flagged for Riba (interest-based lending/borrowing mechanisms in DeFi).');
  }

  // IIFA (International Islamic Fiqh Academy) Resolution & General Consensus: Memecoins = Gharar / Maysir
  const memecoins = ['DOGE', 'SHIB', 'PEPE', 'WIF', 'BONK', 'FLOKI'];
  if (memecoins.includes(t) || n.includes('doge') || n.includes('inu')) {
    hasUtility = false;
    noMaysir = false;
    forceHaram = true;
    reasoning.push('IIFA Consensus: Excessive speculation (Gharar) and lacks real economic utility.');
    reasoning.push('General Consensus: Price driven entirely by hype, resembling gambling (Maysir).');
  }

  // ---------------------------------------------------------
  // 2. SCORING MATRIX
  // ---------------------------------------------------------
  // Real Utility           |  30%
  // No Riba                |  25%
  // No Maysir              |  20%
  // No Haram Industry      |  15%
  // Transparency           |  10%

  if (hasUtility) score += 30;
  if (noRiba) score += 25;
  if (noMaysir) score += 20;
  if (noHaramIndustry) score += 15;
  if (isTransparent) score += 10;

  // Apply overrides for certified/haram coins
  if (forceHalal) score = 100;
  if (forceHaram) score = 0;

  // ---------------------------------------------------------
  // 3. FINAL VERDICT GENERATION
  // ---------------------------------------------------------
  let status: ShariaStatus;
  let badge: BadgeType;
  let confidence: ConfidenceLevel;

  if (score >= 80) {
    status = "halal";
    badge = certifiedBy ? "halal_certified" : "review_required";
    confidence = certifiedBy ? "high" : "medium";
  } else if (score >= 50) {
    status = "doubtful";
    badge = "review_required";
    confidence = "high";
  } else {
    status = "haram";
    badge = "haram";
    confidence = "high";
  }

  return {
    coin: name,
    ticker: t,
    status,
    confidence,
    reasoning,
    badge,
    certified_by: certifiedBy,
    last_updated: now,
    score
  };
}
