"use client";

import React, { useState } from "react";
import Link from "next/link";

// ADMIN_EMAIL = "admin@myzzan.com"
// ADMIN_PASSWORD_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" // SHA-256 for adminpassword123

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState("");

  // Manage mutable mock state for admin actions
  const [users, setUsers] = useState([
    { id: 1, email: "user1@gmail.com", plan: "INVESTOR", joined: "2026-05-10", active: "2026-05-18", analyses: 14, apiCalls: 85, status: "Active" },
    { id: 2, email: "builder_co@devs.net", plan: "BUILDER", joined: "2026-05-12", active: "2026-05-17", analyses: 45, apiCalls: 1240, status: "Active" },
    { id: 3, email: "halal_whale@remit.sa", plan: "PLATFORM", joined: "2026-05-14", active: "2026-05-18", analyses: 112, apiCalls: 18450, status: "Active" },
    { id: 4, email: "spammer@leaked.io", plan: "FREE", joined: "2026-05-15", active: "2026-05-16", analyses: 3, apiCalls: 0, status: "Banned" }
  ]);

  const [queue, setQueue] = useState([
    { ticker: "NEAR", score: 68, verdict: "Doubtful", reason: "Validator staking uses interest yield, but core L1 utility exists.", status: "Pending Scholar Confirmation" },
    { ticker: "FTM", score: 62, verdict: "Doubtful", reason: "High concentration of validator rewards; under scholarly review.", status: "Pending Scholar Confirmation" },
    { ticker: "RUNE", score: 65, verdict: "Doubtful", reason: "Liquidity pools generate yield matching synthetic debt.", status: "Pending Data Collection" }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@myzzan.com" && password === "adminpassword123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid administrative credentials.");
    }
  };

  const handleBanUser = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Banned" ? "Active" : "Banned" } : u));
  };

  const handleUpgradeUser = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, plan: "PLATFORM" } : u));
  };

  const handleQueueAction = (ticker: string, action: string) => {
    alert(`Coin ${ticker} updated to: ${action}`);
    setQueue(prev => prev.filter(q => q.ticker !== ticker));
  };

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
              <rect x="16" y="55" width="8" height="12" fill="#4a6fa5" rx="1.5" />
              <rect x="76" y="55" width="8" height="12" fill="#4a6fa5" rx="1.5" />
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
          {["overview", "users", "escalations", "payments", "audit"].map(t => (
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
              <div className="card" style={{ borderLeft: "3px solid #b8940a" }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#9a9aaa", letterSpacing: "0.12em", marginBottom: "4px" }}>Total Users</div>
                <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: "600" }}>1,482</div>
                <div style={{ fontSize: "11px", color: "#2a7a4a" }}>+48 this week</div>
              </div>
              <div className="card" style={{ borderLeft: "3px solid #b8940a" }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#9a9aaa", letterSpacing: "0.12em", marginBottom: "4px" }}>Revenue Today</div>
                <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: "600" }}>$2,850</div>
                <div style={{ fontSize: "11px", color: "#9a9aaa" }}>Paid in Crypto (USDT/BTC)</div>
              </div>
              <div className="card" style={{ borderLeft: "3px solid #b8940a" }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#9a9aaa", letterSpacing: "0.12em", marginBottom: "4px" }}>Analyses Today</div>
                <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: "600" }}>324</div>
                <div style={{ fontSize: "11px", color: "#2a7a4a" }}>100% engine uptime</div>
              </div>
              <div className="card" style={{ borderLeft: "3px solid #b8940a" }}>
                <div style={{ fontSize: "10px", textTransform: "uppercase", color: "#9a9aaa", letterSpacing: "0.12em", marginBottom: "4px" }}>API Calls Today</div>
                <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: "600" }}>84,250</div>
                <div style={{ fontSize: "11px", color: "#9a9aaa" }}>Avg latency: 124ms</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="card">
              <h3 style={{ fontSize: "16px", marginBottom: "1.5rem" }}>Platform Health & System Status</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid #f0f0f0", paddingBottom: "8px", fontSize: "13px" }}>
                  <span style={{ color: "#9a9aaa" }}>Most Searched Coin Today:</span>
                  <span style={{ fontWeight: "600" }}>Stellar (XLM) - 142 searches</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid #f0f0f0", paddingBottom: "8px", fontSize: "13px" }}>
                  <span style={{ color: "#9a9aaa" }}>Active Subscription Breakdown:</span>
                  <span style={{ fontWeight: "600" }}>Free (1,120) | Investor (282) | Builder (64) | Platform (16)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#9a9aaa" }}>Database Status:</span>
                  <span style={{ fontWeight: "600", color: "#2a7a4a" }}>● Online / Supabase Connected</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Users */}
        {activeTab === "users" && (
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8faf8", borderBottom: "1px solid #e8e8e8" }}>
                  <th style={{ padding: "16px" }}>Email</th>
                  <th style={{ padding: "16px" }}>Plan</th>
                  <th style={{ padding: "16px" }}>Joined</th>
                  <th style={{ padding: "16px" }}>Last Active</th>
                  <th style={{ padding: "16px" }}>Analyses</th>
                  <th style={{ padding: "16px" }}>API Calls</th>
                  <th style={{ padding: "16px" }}>Status</th>
                  <th style={{ padding: "16px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                    <td style={{ padding: "16px", fontWeight: "500" }}>{u.email}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ background: "#e8eef6", color: "#4a6fa5", borderRadius: "4px", padding: "2px 6px", fontSize: "11px", fontWeight: "600" }}>
                        {u.plan}
                      </span>
                    </td>
                    <td style={{ padding: "16px", color: "#9a9aaa" }}>{u.joined}</td>
                    <td style={{ padding: "16px", color: "#9a9aaa" }}>{u.active}</td>
                    <td style={{ padding: "16px" }}>{u.analyses}</td>
                    <td style={{ padding: "16px" }}>{u.apiCalls}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ color: u.status === "Banned" ? "#c0392b" : "#2a7a4a", fontWeight: "500" }}>{u.status}</span>
                    </td>
                    <td style={{ padding: "16px", textAlign: "right", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button onClick={() => handleUpgradeUser(u.id)} className="btn btn-secondary" style={{ padding: "4px 8px", fontSize: "10px" }}>Upgrade</button>
                      <button onClick={() => handleBanUser(u.id)} className="btn btn-secondary" style={{ padding: "4px 8px", fontSize: "10px", borderColor: "#d8a0a0", color: "#7a1a1a" }}>
                        {u.status === "Banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

        {/* Tab 4: Payments History */}
        {activeTab === "payments" && (
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8faf8", borderBottom: "1px solid #e8e8e8" }}>
                  <th style={{ padding: "16px" }}>User</th>
                  <th style={{ padding: "16px" }}>Plan</th>
                  <th style={{ padding: "16px" }}>Amount</th>
                  <th style={{ padding: "16px" }}>Currency</th>
                  <th style={{ padding: "16px" }}>Transaction Hash</th>
                  <th style={{ padding: "16px" }}>Date</th>
                  <th style={{ padding: "16px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { user: "user1@gmail.com", plan: "INVESTOR", amount: "$19", currency: "USDT", hash: "0x3f5c...921a", date: "2026-05-18", status: "Settled" },
                  { user: "whale@remit.sa", plan: "PLATFORM", amount: "$249", currency: "USDC", hash: "0x89ab...d41b", date: "2026-05-17", status: "Settled" },
                  { user: "builder_co@devs.net", plan: "BUILDER", amount: "$69", currency: "BTC", hash: "f82c...391e", date: "2026-05-16", status: "Settled" }
                ].map((p, i) => (
                  <tr key={i} style={{ borderBottom: "0.5px solid #f0f0f0" }}>
                    <td style={{ padding: "16px" }}>{p.user}</td>
                    <td style={{ padding: "16px", fontWeight: "600" }}>{p.plan}</td>
                    <td style={{ padding: "16px" }}>{p.amount}</td>
                    <td style={{ padding: "16px" }}>{p.currency}</td>
                    <td style={{ padding: "16px", fontFamily: "monospace", color: "#9a9aaa" }}>{p.hash}</td>
                    <td style={{ padding: "16px", color: "#9a9aaa" }}>{p.date}</td>
                    <td style={{ padding: "16px", color: "#2a7a4a", fontWeight: "600" }}>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 5: Audit Logs */}
        {activeTab === "audit" && (
          <div className="card">
            <h3 style={{ fontSize: "14px", marginBottom: "1rem" }}>System Security Auditing</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "monospace", fontSize: "12px", color: "#5a7a5a" }}>
              <div>[2026-05-18 16:01:23] INFO: Rate limit triggered for IP hash: 0x9f3d... (31 requests/hour unauth)</div>
              <div>[2026-05-18 15:45:11] WARN: Failed admin login attempt from IP 192.168.1.105 (Invalid password)</div>
              <div>[2026-05-18 14:12:05] SEC: Token generation initiated for account whale@remit.sa (Key hashed securely)</div>
              <div>[2026-05-18 12:30:42] INFO: Blocked cross-origin frame embedding request (X-Frame-Options triggered)</div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
