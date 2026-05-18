"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitlistMessage, setWaitlistMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/analyze?ticker=${search.toUpperCase()}`);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;

    setLoading(true);
    setWaitlistMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail, source: "landing_page_inline" }),
      });
      const data = await res.json();
      
      setWaitlistMessage(data.message);
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch {
      setWaitlistMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section style={{ padding: "5rem 0", textAlign: "center", background: "#f4f4f4" }}>
          <div className="container">
            <div style={{ display: "inline-block", background: "#e8eef6", color: "#4a6fa5", padding: "6px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: "500", marginBottom: "2.5rem" }}>
              <span style={{ marginRight: "6px" }}>●</span> 50 coins screened live
            </div>
            
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "48px", color: "#1a1a2e", marginBottom: "1.5rem" }}>
              Is your crypto <span style={{ color: "#4a6fa5", fontStyle: "italic", fontWeight: 400 }}>halal?</span>
            </h1>
            
            <p style={{ fontWeight: 300, color: "#9a9aaa", fontSize: "13px", lineHeight: "1.8", maxWidth: "550px", margin: "0 auto 3.5rem" }}>
              Integrate verified, real-time Halal cryptocurrency data into your platforms seamlessly. 
              Our enterprise-grade API powers the next generation of Islamic finance applications.
            </p>
            
            {/* Spot Screening Search Block */}
            <div style={{ maxWidth: '550px', margin: '0 auto 4rem', background: '#ffffff', border: '0.5px solid #e8e8e8', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: '#1a1a2e', marginBottom: '8px', textAlign: 'left' }}>
                Instant Spot Screening
              </h3>
              <p style={{ fontSize: '12px', color: '#9a9aaa', fontWeight: 300, marginBottom: '20px', textAlign: 'left' }}>
                Run an algorithmic check on any cryptocurrency whitepaper and smart contract instantly.
              </p>
              
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search any coin — BTC, ETH, XLM..." 
                  style={{ flex: 1, padding: '11px 16px', borderRadius: '9px', border: '0.5px solid #e0e0e8', background: '#f4f4f4', color: '#1a1a2e', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '11px', outline: 'none' }}
                />
                <button 
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '11px 18px', fontSize: '11px' }}
                >
                  Check
                </button>
              </form>
              <div style={{ textAlign: 'left' }}>
                <Link href="/dashboard/coins" style={{ fontSize: '11px', color: '#4a6fa5', fontWeight: '500', textDecoration: 'underline' }}>
                  Browse Top 50 Halal Coin Index &rarr;
                </Link>
              </div>
            </div>

            {/* Waitlist Capture Block */}
            <div style={{ maxWidth: '550px', margin: '0 auto', background: '#ffffff', border: '0.5px solid #e8e8e8', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: '#1a1a2e', marginBottom: '8px', textAlign: 'left' }}>
                Get Full Platform Access
              </h3>
              <p style={{ fontSize: '12px', color: '#9a9aaa', fontWeight: 300, marginBottom: '20px', textAlign: 'left' }}>
                Receive full developer API integration keys and detailed scholarly Sharia reasoning briefs on full launch.
              </p>

              {isSuccess ? (
                <div style={{ color: "#2a7a4a", fontSize: "13px", fontWeight: "500", background: "#eaf6ee", padding: "12px", borderRadius: "8px", textAlign: "left" }}>
                  {waitlistMessage}
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="email" 
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Enter your email address" 
                      required
                      style={{ flex: 1, padding: '11px 16px', borderRadius: '9px', border: '0.5px solid #e0e0e8', background: '#ffffff', color: '#1a1a2e', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '11px', outline: 'none' }}
                    />
                    <button 
                      type="submit"
                      disabled={loading}
                      style={{
                        background: '#4a6fa5', color: '#ffffff', padding: '11px 18px',
                        border: 'none', borderRadius: '9px', fontSize: '11px', fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {loading ? "Joining..." : "Join the Waitlist"}
                    </button>
                  </div>
                  {waitlistMessage && (
                    <div style={{ color: "#c0392b", fontSize: "11px", fontWeight: "500", textAlign: "left" }}>
                      {waitlistMessage}
                    </div>
                  )}
                </form>
              )}

              <p style={{ fontSize: '11px', color: '#9a9aaa', fontWeight: '400', marginTop: '16px', textAlign: 'left' }}>
                👥 Join 500+ Muslim investors getting early access
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
