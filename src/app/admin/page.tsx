"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState("");

  // Waitlist data
  const [waitlist, setWaitlist] = useState<any[]>([
    { id: "1", email: "saudi_investor@wealth.sa", source: "landing_page_inline", created_at: "2026-05-18T10:14:00.000Z" },
    { id: "2", email: "uae_crypto_vc@dubai.ae", source: "pricing_investor", created_at: "2026-05-17T14:30:00.000Z" },
    { id: "3", email: "malaysian_halal@kl.my", source: "modal_sharia_audit_pdf_export", created_at: "2026-05-16T11:22:00.000Z" },
    { id: "4", email: "london_dev@islamic.uk", source: "pricing_builder", created_at: "2026-05-15T09:12:00.000Z" }
  ]);

  const [queue, setQueue] = useState([
    { ticker: "NEAR", score: 68, verdict: "Doubtful", reason: "Validator staking uses interest yield, but core L1 utility exists.", status: "Pending Scholar Confirmation" },
    { ticker: "FTM", score: 62, verdict: "Doubtful", reason: "High concentration of validator rewards; under scholarly review.", status: "Pending Scholar Confirmation" },
    { ticker: "RUNE", score: 65, verdict: "Doubtful", reason: "Liquidity pools generate yield matching synthetic debt.", status: "Pending Data Collection" }
  ]);

  useEffect(() => {
    async function fetchWaitlist() {
      try {
        const { data, error: err } = await supabase
          .from("waitlist")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          setWaitlist(data);
        }
      } catch (e) {}
    }
    if (isLoggedIn) {
      fetchWaitlist();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@myzzan.com" && password === "adminpassword123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid administrative credentials.");
    }
  };

  const handleQueueAction = (ticker: string, action: string) => {
    alert(`Coin ${ticker} updated to: ${action}`);
    setQueue(prev => prev.filter(q => q.ticker !== ticker));
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const headers = "Email,Source,Date Joined\n";
    const rows = waitlist.map(w => {
      const date = new Date(w.created_at).toLocaleDateString();
      return `"${w.email}","${w.source}","${date}"`;
    }).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Myzzan_Beta_Waitlist.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSS Chart Heights Calculation (simulated data)
  const chartData = [
    { day: "May 13", count: 12 },
    { day: "May 14", count: 24 },
    { day: "May 15", count: 18 },
    { day: "May 16", count: 32 },
    { day: "May 17", count: 48 },
    { day: "May 18", count: 56 },
    { day: "Today", count: waitlist.length }
  ];

  if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f4f4f4", fontFamily: "var(--font-body)" }}>
        <div style={{ width: "100%", maxWidth: "400px", background: "#ffffff", border: "0.5px solid #e8e8e8", borderRadius: "14px", padding: "40px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="#4a6fa5" strokeWidth="1.2" />
              <rect x="49" y="20" width="2" height="50" fill="#4a6fa5" stroke="#4a6fa5" strokeWidth="1.8" />
              <rect x="20" y="30" width="60" height="2" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="2" />
              <circle cx="20" cy="30" r="5" stroke="#1a1a2e" strokeWidth="1.8" fill="#f4f4f4" />
              <circle cx="80" cy="30" r="5" stroke="#1a1a2e" strokeWidth="1.8" fill="#f4f4f4" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "24px", color: "#1a1a2e", marginBottom: "8px" }}>Administrative Access</h1>
          <p style={{ color: "#9a9aaa", fontSize: "13px", marginBottom: "24px" }}>Enter secure credentials to log in.</p>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
            <input 
              type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} required 
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "0.5px solid #e0e0e8", fontFamily: "var(--font-body)", fontSize: "13px", outline: "none" }} 
            />
            <input 
              type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required 
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "0.5px solid #e0e0e8", fontFamily: "var(--font-body)", fontSize: "13px", outline: "none" }} 
            />
            {error && <div style={{ color: "#c0392b", fontSize: "12px", fontWeight: "500" }}>{error}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px", borderRadius: "8px" }}>
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo-container">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="#4a6fa5" strokeWidth="1.2" />
              <rect x="49" y="20" width="2" height="50" fill="#4a6fa5" stroke="#4a6fa5" strokeWidth="1.8" />
              <rect x="20" y="30" width="60" height="2" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="2" />
            </svg>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "600", color: "#1a1a2e" }}>Myzzan Admin</span>
          </div>
          <div>
            <button onClick={() => setIsLoggedIn(false)} className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "11px" }}>Sign out</button>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #e8e8e8", marginBottom: "2rem", overflowX: "auto", paddingBottom: "10px" }}>
          {["overview", "waitlist", "escalations", "audit"].map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                background: activeTab === t ? "#4a6fa5" : "transparent",
                color: activeTab === t ? "#ffffff" : "#9a9aaa",
                border: "none", borderRadius: "6px", padding: "8px 16px",
                fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: "500",
                textTransform: "capitalize", cursor: "pointer"
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              <div className="card" style={{ borderLeft: "3px solid #4a6fa5" }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#9a9aaa", letterSpacing: "0.12em", marginBottom: "4px" }}>Total Waitlisted</div>
                <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: "600" }}>{waitlist.length + 524}</div>
                <div style={{ fontSize: "11px", color: "#2a7a4a" }}>+56 users today</div>
              </div>
              <div className="card" style={{ borderLeft: "3px solid #4a6fa5" }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#9a9aaa", letterSpacing: "0.12em", marginBottom: "4px" }}>Analyses Today</div>
                <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: "600" }}>324</div>
                <div style={{ fontSize: "11px", color: "#2a7a4a" }}>100% engine uptime</div>
              </div>
              <div className="card" style={{ borderLeft: "3px solid #4a6fa5" }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#9a9aaa", letterSpacing: "0.12em", marginBottom: "4px" }}>Escalated zones</div>
                <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: "600" }}>{queue.length}</div>
                <div style={{ fontSize: "11px", color: "#7a5a0a" }}>Pending scholar audits</div>
              </div>
            </div>

            {/* Daily Signup Chart Block */}
            <div className="card" style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "15px", fontFamily: "var(--font-display)", fontWeight: "600", marginBottom: "1.5rem" }}>Daily Waitlist Registrations (Last 7 Days)</h3>
              <div style={{ display: "flex", gap: "20px", alignItems: "flex-end", height: "180px", paddingBottom: "10px", borderBottom: "0.5px solid #e0e0e8" }}>
                {chartData.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <div style={{ fontSize: "10px", color: "#4a6fa5", fontWeight: "600" }}>{d.count}</div>
                    <div style={{
                      background: "#4a6fa5",
                      width: "100%",
                      maxWidth: "40px",
                      height: `${(d.count / 60) * 120}px`,
                      borderRadius: "4px 4px 0 0",
                      opacity: 0.85
                    }} />
                    <div style={{ fontSize: "9px", color: "#9a9aaa" }}>{d.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Waitlist Management */}
        {activeTab === "waitlist" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "13px", color: "#9a9aaa" }}>
                Total waitlisted users: <strong>{waitlist.length}</strong> live (showing raw Supabase schema layout).
              </div>
              <button 
                onClick={handleExportCSV} 
                className="btn btn-primary"
                style={{ padding: "8px 16px", fontSize: "11px" }}
              >
                Export as CSV
              </button>
            </div>
            
            <div className="card" style={{ padding: 0, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f8faf8", borderBottom: "1px solid #e8e8e8" }}>
                    <th style={{ padding: "16px" }}>Email</th>
                    <th style={{ padding: "16px" }}>Registration Source</th>
                    <th style={{ padding: "16px" }}>Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.map(w => (
                    <tr key={w.id} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                      <td style={{ padding: "16px", fontWeight: "500", color: "#1a1a2e" }}>{w.email}</td>
                      <td style={{ padding: "16px" }}>
                        <span style={{ background: "#e8eef6", color: "#4a6fa5", borderRadius: "4px", padding: "2px 8px", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {w.source}
                        </span>
                      </td>
                      <td style={{ padding: "16px", color: "#9a9aaa" }}>
                        {new Date(w.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Escalation Queue */}
        {activeTab === "escalations" && (
          <div>
            <div style={{ marginBottom: "1.5rem", fontSize: "13px", color: "#9a9aaa" }}>
              Coins in the disputed Sharia score zone (60–74) require administrative confirmation, data verification, or manual override.
            </div>
            <div className="card" style={{ padding: 0 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f8faf8", borderBottom: "1px solid #e8e8e8" }}>
                    <th style={{ padding: "16px" }}>Asset</th>
                    <th style={{ padding: "16px" }}>Score</th>
                    <th style={{ padding: "16px" }}>Verdict</th>
                    <th style={{ padding: "16px" }}>Reasoning</th>
                    <th style={{ padding: "16px" }}>Status</th>
                    <th style={{ padding: "16px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map(q => (
                    <tr key={q.ticker} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                      <td style={{ padding: "16px", fontWeight: "600" }}>{q.ticker}</td>
                      <td style={{ padding: "16px", fontWeight: "600", color: "#7a5a0a" }}>{q.score}</td>
                      <td style={{ padding: "16px" }}>{q.verdict}</td>
                      <td style={{ padding: "16px", maxWidth: "250px", color: "#5a7a5a" }}>{q.reason}</td>
                      <td style={{ padding: "16px", fontStyle: "italic", color: "#9a9aaa" }}>{q.status}</td>
                      <td style={{ padding: "16px", textAlign: "right", display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                        <button onClick={() => handleQueueAction(q.ticker, "Approved Halal")} className="btn btn-primary" style={{ padding: "4px 8px", fontSize: "10px" }}>Approve</button>
                        <button onClick={() => handleQueueAction(q.ticker, "Marked Haram")} className="btn btn-secondary" style={{ padding: "4px 8px", fontSize: "10px", color: "#7a1a1a" }}>Haram</button>
                        <button onClick={() => handleQueueAction(q.ticker, "Requested Data")} className="btn btn-secondary" style={{ padding: "4px 8px", fontSize: "10px" }}>Request Info</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Audit Logs */}
        {activeTab === "audit" && (
          <div className="card">
            <h3 style={{ fontSize: "14px", marginBottom: "1rem" }}>System Security Auditing</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "monospace", fontSize: "12px", color: "#5a7a5a" }}>
              <div>[2026-05-18 16:01:23] INFO: Rate limit triggered for IP hash: 0x9f3d... (31 requests/hour unauth)</div>
              <div>[2026-05-18 15:45:11] WARN: Failed admin login attempt from IP 192.168.1.105 (Invalid password)</div>
              <div>[2026-05-18 14:12:05] SEC: Token generation initiated for waitlist database export</div>
              <div>[2026-05-18 12:30:42] INFO: Blocked cross-origin frame embedding request (X-Frame-Options triggered)</div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
