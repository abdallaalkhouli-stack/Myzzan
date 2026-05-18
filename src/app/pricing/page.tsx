"use client";

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface TierFormProps {
  tierName: string;
}

function TierWaitlistForm({ tierName }: TierFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `pricing_${tierName.toLowerCase()}` }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok && data.success) {
        setSuccess(true);
      }
    } catch {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ color: "#2a7a4a", fontSize: "11px", fontWeight: "500", background: "#eaf6ee", padding: "8px 12px", borderRadius: "6px", textAlign: "center" }}>
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{
          width: "100%", padding: "10px 12px", borderRadius: "6px",
          border: "0.5px solid #e0e0e8", fontFamily: "var(--font-body)",
          fontSize: "12px", outline: "none", background: "#ffffff"
        }}
      />
      {message && (
        <div style={{ color: "#c0392b", fontSize: "10px", fontWeight: "500", textAlign: "left" }}>
          {message}
        </div>
      )}
      <button 
        type="submit" 
        disabled={loading}
        className="btn btn-primary" 
        style={{ width: "100%", padding: "10px", borderRadius: "6px", fontSize: "11px", fontWeight: "500" }}
      >
        {loading ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}

export default function Pricing() {
  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', maxWidth: '1100px', textAlign: 'center', flex: 1 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '40px', color: '#1a1a2e', margin: '0 0 10px 0' }}>
          Enterprise Beta Access
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '14px', color: '#9a9aaa', margin: '0 0 4rem 0' }}>
          Myzzan is currently in closed beta. Select your desired tier and join the waitlist for priority access.
        </p>

        {/* Crypto Payment Info */}
        <div className="card" style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '12px 24px', borderRadius: '50px', marginBottom: '3rem', border: '1px solid #4a6fa5' }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Future settlements powered exclusively by crypto
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {["USDT", "BTC", "ETH", "USDC"].map(c => (
              <span key={c} style={{ background: '#e8eef6', color: '#4a6fa5', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '600' }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
          
          {/* FREE PLAN */}
          <div className="card" style={{ padding: '28px', textAlign: 'left', borderRadius: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9aaa', marginBottom: '1rem' }}>FREE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '42px', color: '#1a1a2e', lineHeight: 1 }}>$0</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                {["3 spot analyses/month", "Basic verdict only", "No PDF downloads", "No API key access"].map((f,i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: '#1a1a2e' }}>
                    <span style={{ color: '#4a6fa5' }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
            <TierWaitlistForm tierName="Free" />
          </div>

          {/* INVESTOR PLAN */}
          <div className="card" style={{ position: 'relative', border: '2px solid #4a6fa5', padding: '28px', textAlign: 'left', borderRadius: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: '#4a6fa5', color: '#ffffff', fontFamily: 'var(--font-body)', fontSize: '10px', padding: '4px 16px', borderRadius: '20px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MOST POPULAR</div>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9aaa', marginBottom: '1rem', marginTop: '0.5rem' }}>INVESTOR</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '42px', color: '#1a1a2e', lineHeight: 1 }}>$19</span>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#9a9aaa' }}>/month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                {["Unlimited analyses", "Full reasoning + score", "PDF certificates", "50 coin dashboard index"].map((f,i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: '#1a1a2e' }}>
                    <span style={{ color: '#4a6fa5' }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
            <TierWaitlistForm tierName="Investor" />
          </div>

          {/* BUILDER PLAN */}
          <div className="card" style={{ padding: '28px', textAlign: 'left', borderRadius: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9aaa', marginBottom: '1rem' }}>BUILDER</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '42px', color: '#1a1a2e', lineHeight: 1 }}>$69</span>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#9a9aaa' }}>/month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                {["Everything in Investor", "Personal API key", "1,000 calls/day limit", "Embeddable Halal badges"].map((f,i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: '#1a1a2e' }}>
                    <span style={{ color: '#4a6fa5' }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
            <TierWaitlistForm tierName="Builder" />
          </div>

          {/* PLATFORM PLAN */}
          <div className="card" style={{ padding: '28px', textAlign: 'left', borderRadius: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9aaa', marginBottom: '1rem' }}>PLATFORM</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '42px', color: '#1a1a2e', lineHeight: 1 }}>$249</span>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#9a9aaa' }}>/month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                {["Everything in Builder", "Unlimited API rate limits", "White label PDF reports", "Arabic + English options", "Certified partner list"].map((f,i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: '#1a1a2e' }}>
                    <span style={{ color: '#4a6fa5' }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
            <TierWaitlistForm tierName="Platform" />
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
