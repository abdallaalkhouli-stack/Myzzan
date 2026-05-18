"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { getCoinDetails, evaluateShariaCompliance, CoinData, ShariaReport } from "../../services/shariaEngine";

const SCAN_STEPS = [
  "Fetching coin data...",
  "Reading project description...",
  "Checking utility signals...",
  "Scanning for Riba...",
  "Scanning for Gharar...",
  "Scanning for Maysir...",
  "Checking industry exposure...",
  "Checking transparency...",
  "Checking hard blockers...",
  "Calculating score..."
];

export default function Analyze() {
  const [ticker, setTicker] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [scanHistory, setScanHistory] = useState<string[]>([]);
  const [isPaid, setIsPaid] = useState(false); // Simulate plan upgrade
  const [freeCount, setFreeCount] = useState(3);
  const [result, setResult] = useState<{ coin: CoinData; report: ShariaReport } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [language, setLanguage] = useState<"EN" | "AR">("EN");

  // Trendings list
  const trending = ["BTC", "XLM", "AAVE", "ETH", "SOL"];

  // Handle direct scan from trending or parameter
  const triggerScan = (symbol: string) => {
    if (freeCount <= 0 && !isPaid) {
      setErrorMessage(language === "EN" 
        ? "You've used all 3 free analyses. Upgrade to Investor+ for unlimited access."
        : "لقد استنفدت التحليلات المجانية الـ 3. قم بالترقية للوصول غير المحدود."
      );
      return;
    }

    // Input sanitization
    const sanitized = symbol.replace(/[^a-zA-Z0-9]/g, "").substring(0, 10).toUpperCase();
    if (!sanitized) {
      setErrorMessage(language === "EN" ? "Invalid symbol format." : "رمز العملة غير صالح.");
      return;
    }

    setResult(null);
    setErrorMessage("");
    setIsScanning(true);
    setCurrentStep(0);
    setScanHistory([]);
  };

  useEffect(() => {
    if (!isScanning) return;

    if (currentStep < SCAN_STEPS.length) {
      const delay = 800 + Math.random() * 400; // 0.8 to 1.2 seconds
      const timer = setTimeout(() => {
        setScanHistory(prev => [...prev, `▸ ${SCAN_STEPS[currentStep]}`]);
        setCurrentStep(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Completed scanning
      setIsScanning(false);
      const symbol = ticker.toUpperCase() || "BTC";
      const coin = getCoinDetails(symbol, symbol);
      const report = evaluateShariaCompliance(coin);

      setResult({ coin, report });
      if (!isPaid) {
        setFreeCount(prev => Math.max(0, prev - 1));
      }
    }
  }, [isScanning, currentStep]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker) return;
    triggerScan(ticker);
  };

  const getBadgeStyle = (status: string) => {
    if (status === "halal") return { background: "#eaf6ee", color: "#1a6a3a", border: "1px solid #b0d4b8" };
    if (status === "haram") return { background: "#faeaea", color: "#7a1a1a", border: "1px solid #d8a0a0" };
    return { background: "#fdf8ea", color: "#7a5a0a", border: "1px solid #d8c070" };
  };

  const getBadgeText = (status: string) => {
    if (language === "AR") {
      if (status === "halal") return "حلال ✅";
      if (status === "haram") return "حرام ❌";
      return "مشبوه ⚠️";
    }
    if (status === "halal") return "✓ Halal";
    if (status === "haram") return "✗ Haram";
    return "⚠ Doubtful";
  };

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", fontFamily: "var(--font-body)" }} dir={language === "AR" ? "rtl" : "ltr"}>
      <header className="header">
        <div className="container header-content">
          <div className="logo-container" style={{ gap: "10px" }}>
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="#4a6fa5" strokeWidth="1.2" />
              <rect x="49" y="20" width="2" height="50" fill="#4a6fa5" stroke="#4a6fa5" strokeWidth="1.8" />
              <rect x="20" y="30" width="60" height="2" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="2" />
              <circle cx="20" cy="30" r="5" stroke="#1a1a2e" strokeWidth="1.8" fill="#f4f4f4" />
              <circle cx="80" cy="30" r="5" stroke="#1a1a2e" strokeWidth="1.8" fill="#f4f4f4" />
              <rect x="16" y="55" width="8" height="12" fill="#4a6fa5" rx="1.5" />
              <rect x="76" y="55" width="8" height="12" fill="#4a6fa5" rx="1.5" />
              <line x1="20" y1="36" x2="20" y2="55" stroke="#4a6fa5" strokeWidth="1.2" />
              <line x1="80" y1="36" x2="80" y2="55" stroke="#4a6fa5" strokeWidth="1.2" />
            </svg>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "600", color: "#1a1a2e" }}>Myzzan</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <button 
              onClick={() => setLanguage(prev => prev === "EN" ? "AR" : "EN")}
              style={{ background: "none", border: "none", color: "#4a6fa5", fontWeight: "500", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "12px" }}
            >
              {language === "EN" ? "عربي" : "English"}
            </button>
            <button 
              onClick={() => setIsPaid(prev => !prev)}
              style={{ background: isPaid ? "#eaf6ee" : "#fff", border: "1px solid #e0e0e8", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", color: isPaid ? "#1a6a3a" : "#4a6fa5", cursor: "pointer" }}
            >
              {isPaid ? (language === "EN" ? "Investor Active" : "مستثمر نشط") : (language === "EN" ? "Simulate Investor+" : "محاكاة مستثمر+")}
            </button>
          </div>
        </div>
      </header>
      <div style={{ height: "0.5px", width: "100%", backgroundColor: "#e8e8e8" }} />

      <main className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: "900px" }}>
        
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "38px", color: "#1a1a2e", marginBottom: "10px" }}>
            {language === "EN" ? "Instant Sharia Screener" : "فاحص الشريعة الفوري"}
          </h1>
          <p style={{ color: "#9a9aaa", fontSize: "13px", fontWeight: "300" }}>
            {language === "EN" ? "Analyze any cryptocurrency for Sharia compliance in real-time" : "حلل أي عملة مشفرة لمعرفة مدى توافقها مع الشريعة الإسلامية في الوقت الفعلي"}
          </p>
        </div>

        {/* Input Bar */}
        <div className="card" style={{ padding: "24px", marginBottom: "2rem" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
            <input 
              type="text" 
              placeholder={language === "EN" ? "Enter symbol (e.g. BTC, XLM, AAVE)..." : "أدخل رمز العملة (مثال: BTC, XLM)..."}
              value={ticker}
              onChange={e => setTicker(e.target.value.toUpperCase())}
              disabled={isScanning}
              style={{ flex: 1, padding: "12px 16px", borderRadius: "8px", border: "1px solid #e0e0e8", fontFamily: "var(--font-body)", fontSize: "13px", color: "#1a1a2e", outline: "none" }}
            />
            <button 
              type="submit" 
              disabled={isScanning || !ticker}
              className="btn btn-primary"
              style={{ padding: "12px 24px", fontSize: "12px", borderRadius: "8px" }}
            >
              {language === "EN" ? "Analyze" : "تحليل"}
            </button>
          </form>

          {errorMessage && (
            <div style={{ marginTop: "12px", color: "#c0392b", fontSize: "12px", fontWeight: "500" }}>
              {errorMessage}
            </div>
          )}

          {/* Free searches counter */}
          {!isPaid && (
            <div style={{ marginTop: "12px", fontSize: "11px", color: "#9a9aaa", textAlign: language === "AR" ? "left" : "right" }}>
              {language === "EN" ? `Free scans left this month: ${freeCount}` : `العمليات المجانية المتبقية هذا الشهر: ${freeCount}`}
            </div>
          )}
        </div>

        {/* Trending Index */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "2rem", overflowX: "auto" }}>
          <span style={{ fontSize: "11px", color: "#9a9aaa", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {language === "EN" ? "TRENDING:" : "الشائع:"}
          </span>
          {trending.map(t => (
            <button 
              key={t}
              onClick={() => { setTicker(t); triggerScan(t); }}
              style={{ background: "#ffffff", border: "1px solid #e0e0e8", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", color: "#4a6fa5", cursor: "pointer" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Scanner Log Screen */}
        {isScanning && (
          <div className="card" style={{ background: "#1a1a2e", color: "#00ffcc", fontFamily: "monospace", padding: "24px", borderRadius: "12px", minHeight: "220px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {scanHistory.map((step, i) => (
              <div key={i} style={{ fontSize: "13px" }}>{step}</div>
            ))}
            <div style={{ animation: "pulse 1s infinite", color: "#4a6fa5" }}>▸ Scanning...</div>
          </div>
        )}

        {/* Scan Result Container */}
        {result && !isScanning && (
          <div>
            {/* Header Identity Card */}
            <div className="card" style={{ display: "flex", gap: "24px", alignItems: "center", marginBottom: "2rem" }}>
              <div style={{ width: "48px", height: "48px", background: "#f4f4f4", borderRadius: "50%", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: "600", fontSize: "20px", color: "#4a6fa5" }}>
                {result.coin.symbol.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "#1a1a2e", margin: 0 }}>
                  {result.coin.name}
                </h2>
                <div style={{ fontSize: "11px", color: "#9a9aaa", textTransform: "uppercase" }}>{result.coin.classification}</div>
              </div>
              <div>
                <span className="badge" style={getBadgeStyle(result.report.status)}>
                  {getBadgeText(result.report.status)}
                </span>
              </div>
            </div>

            {/* Scoreboard Card */}
            <div className="card" style={{ textAlign: "center", padding: "3rem 2rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "11px", color: "#9a9aaa", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "10px" }}>
                {language === "EN" ? "SHARIA COMPLIANCE SCORE" : "درجة التوافق الشرعي"}
              </div>
              <div style={{ fontSize: "72px", fontFamily: "var(--font-display)", color: result.report.status === "halal" ? "#1a6a3a" : result.report.status === "haram" ? "#7a1a1a" : "#7a5a0a", fontWeight: "600", lineHeight: 1 }}>
                {result.report.score}<span style={{ fontSize: "24px", color: "#9a9aaa" }}>/100</span>
              </div>

              {result.report.scholar_review_advised && (
                <div style={{ marginTop: "1rem", background: "#fdf8ea", color: "#7a5a0a", border: "1px solid #d8c070", borderRadius: "8px", padding: "10px", fontSize: "12px", display: "inline-block" }}>
                  ⚠️ {language === "EN" ? "Scholar review advised (Score in border zone)" : "يُنصح بمراجعة علماء الشريعة (الدرجة في المنطقة الحدودية)"}
                </div>
              )}
            </div>

            {/* Paid breakdown vs blurred screen */}
            {isPaid ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* 1. Scholar Citations */}
                <div className="card">
                  <h3 style={{ fontSize: "14px", color: "#1a1a2e", marginBottom: "1rem" }}>
                    {language === "EN" ? "Scholarly References & Standards Cited" : "المراجع الشرعية والمعايير المعتمدة"}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {result.report.scholar_citations.map((c, i) => (
                      <span key={i} style={{ background: "#e8eef6", color: "#4a6fa5", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: "500" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Detailed Checklist */}
                <div className="card">
                  <h3 style={{ fontSize: "14px", color: "#1a1a2e", marginBottom: "1rem" }}>
                    {language === "EN" ? "Evaluation Breakdown" : "تفاصيل التقييم"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {Object.entries(result.report.breakdown).map(([key, item]) => (
                      <div key={key} style={{ 
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "14px 16px", borderRadius: "6px", background: "#f4f4f4",
                        borderLeft: "3px solid #4a6fa5"
                      }}>
                        <div>
                          <div style={{ fontWeight: "500", fontSize: "12px", textTransform: "uppercase" }}>{key.replace("_", " ")}</div>
                          <div style={{ fontSize: "11px", color: "#9a9aaa" }}>{item.reasoning}</div>
                        </div>
                        <div style={{ fontWeight: "600", color: "#4a6fa5", fontSize: "13px" }}>
                          {item.score} / {item.max}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Blockers triggered */}
                {result.report.blockers_triggered.length > 0 && (
                  <div className="card" style={{ background: "#faeaea", border: "1px solid #d8a0a0" }}>
                    <h3 style={{ fontSize: "14px", color: "#7a1a1a", marginBottom: "1rem" }}>
                      {language === "EN" ? "Hard Blockers Triggered" : "الموانع الشرعية النشطة"}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {result.report.blockers_triggered.map((b, i) => (
                        <div key={i} style={{ fontSize: "12px", color: "#7a1a1a" }}>• {b}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Blurred Section
              <div style={{ position: "relative", minHeight: "300px", marginTop: "2rem", overflow: "hidden", borderRadius: "12px" }}>
                {/* Simulated Blurred Card */}
                <div style={{ filter: "blur(8px)", opacity: 0.25, userSelect: "none" }}>
                  <div className="card" style={{ marginBottom: "1rem" }}>
                    <div style={{ height: "20px", width: "150px", background: "#9a9aaa", marginBottom: "10px" }} />
                    <div style={{ height: "12px", width: "300px", background: "#9a9aaa" }} />
                  </div>
                  <div className="card">
                    <div style={{ height: "20px", width: "200px", background: "#9a9aaa", marginBottom: "10px" }} />
                    <div style={{ height: "100px", background: "#9a9aaa" }} />
                  </div>
                </div>

                {/* CTA Box */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem", background: "rgba(244, 244, 244, 0.85)" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "#1a1a2e", marginBottom: "10px" }}>
                    {language === "EN" ? "Unlock Full Sharia Audit" : "افتح تقرير التدقيق الشرعي الكامل"}
                  </h3>
                  <p style={{ color: "#9a9aaa", fontSize: "13px", maxWidth: "400px", marginBottom: "1.5rem" }}>
                    {language === "EN" ? "Upgrade to Investor to view scholar citations, deep whitepaper scans, hard blockers triggered, and download PDF certificates." : "رقّ حسابك لرؤية المراجع الفقهية وتدقيقات المستندات البيضاء الكاملة والموانع النشطة وتنزيل الشهادات بصيغة PDF."}
                  </p>
                  <button className="btn btn-primary" style={{ padding: "12px 24px", fontSize: "12px", borderRadius: "8px" }}>
                    {language === "EN" ? "Upgrade for $19/mo" : "رّق حسابك مقابل 19$/شهرياً"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
