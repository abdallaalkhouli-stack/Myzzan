"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/waitlist");
        const data = await res.json();
        if (data.success) {
          setWaitlistCount(data.count);
        }
      } catch {
        setWaitlistCount(524); // Fallback count
      }
    }
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "waitlist_page" }),
      });
      const data = await res.json();
      
      setMessage(data.message);
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch {
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)" }}>
      <Header />
      
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 20px" }}>
        <div className="container" style={{ maxWidth: "900px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
          
          {/* Left Column: Value Prop */}
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: "600", color: "#1a1a2e", marginBottom: "16px", lineHeight: "1.2" }}>
              Be first to access Myzzan
            </h1>
            <p style={{ fontSize: "14px", color: "#9a9aaa", fontWeight: 300, lineHeight: "1.7", marginBottom: "2rem" }}>
              The world's first AI-powered Halal crypto certification platform. Join the waitlist for early access.
            </p>
            
            {/* Features List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Unlimited Halal coin screening",
                "Full Sharia reasoning per coin",
                "PDF compliance reports",
                "Developer API access",
                "Arabic + English interface"
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#1a1a2e", fontWeight: "300" }}>
                  <span style={{ color: "#4a6fa5", fontWeight: "600" }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div style={{ marginTop: "3rem", borderTop: "0.5px solid #e0e0e8", paddingTop: "1.5rem" }}>
              <p style={{ fontSize: "11px", color: "#9a9aaa", fontStyle: "italic" }}>
                Used by Muslim investors in Saudi Arabia, UAE, Malaysia & beyond
              </p>
            </div>
          </div>

          {/* Right Column: Waitlist Capture Box */}
          <div className="card" style={{ padding: "40px", borderRadius: "16px" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: "600", color: "#4a6fa5", marginBottom: "6px" }}>
                {waitlistCount !== null ? waitlistCount.toLocaleString() : "..."}
              </div>
              <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#9a9aaa", letterSpacing: "0.1em" }}>
                Muslim investors already waiting
              </div>
            </div>

            {isSuccess ? (
              <div style={{ color: "#2a7a4a", fontSize: "13px", fontWeight: "500", background: "#eaf6ee", padding: "16px", borderRadius: "8px", textAlign: "center", lineHeight: "1.6" }}>
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#9a9aaa", display: "block", marginBottom: "8px", fontWeight: "500" }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: "8px",
                      border: "0.5px solid #e0e0e8", fontFamily: "var(--font-body)",
                      fontSize: "13px", outline: "none"
                    }}
                  />
                </div>
                {message && (
                  <div style={{ color: "#c0392b", fontSize: "12px", fontWeight: "500" }}>
                    {message}
                  </div>
                )}
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", fontSize: "13px", fontWeight: "500" }}
                >
                  {loading ? "Joining..." : "Join the Waitlist"}
                </button>
              </form>
            )}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
