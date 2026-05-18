"use client";
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function Pricing() {
  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', maxWidth: '1100px', textAlign: 'center', flex: 1 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '40px', color: '#1a1a2e', margin: '0 0 10px 0' }}>Enterprise Plans</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '14px', color: '#9a9aaa', margin: '0 0 4rem 0' }}>Select the Sharia-compliance access tier right for your platform or portfolio.</p>

        {/* Crypto Payment Info */}
        <div className="card" style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '12px 24px', borderRadius: '50px', marginBottom: '3rem', border: '1px solid #4a6fa5' }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pay with crypto — instant access</span>
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
            <Link href="/signup" style={{ display: 'block', width: '100%', textAlign: 'center', background: '#f4f4f4', border: '1px solid #e0e0e8', color: '#1a1a2e', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '12px', padding: '12px', borderRadius: '8px', textDecoration: 'none' }}>Get Started</Link>
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
            <button style={{ width: '100%', background: '#4a6fa5', color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '12px', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Subscribe Investor</button>
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
            <button style={{ width: '100%', background: '#1a1a2e', color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '12px', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Subscribe Builder</button>
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
            <button style={{ width: '100%', background: '#ffffff', border: '1px solid #e0e0e8', color: '#1a1a2e', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '12px', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}>Subscribe Platform</button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
