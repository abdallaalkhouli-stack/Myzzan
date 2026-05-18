"use client";
import Link from 'next/link';
import { Header } from '../components/Header';

export default function Pricing() {
  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh' }}>
      <Header />
      <main className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', maxWidth: '1000px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '40px', color: '#1a1a2e', margin: '0 0 10px 0' }}>Transparent Pricing</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '14px', color: '#5a7a5a', margin: '0 0 4rem 0' }}>Choose the plan that fits your platform's needs. Upgrade or downgrade at any time.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>
          
          <div className="card" style={{ padding: '32px', textAlign: 'left', borderRadius: '14px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9aaa', marginBottom: '1rem' }}>FREE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '48px', color: '#1a1a2e', lineHeight: 1 }}>$0</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
              {["10 coin checks per day", "No API key", "Access to top 20 coins only"].map((f,i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#1a1a2e' }}>
                  <span style={{ color: '#4a6fa5' }}>✓</span> {f}
                </div>
              ))}
            </div>
            <Link href="/signup" style={{ display: 'block', width: '100%', textAlign: 'center', background: '#f4f4f4', border: '1px solid #e0e0e8', color: '#1a1a2e', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', padding: '12px', borderRadius: '8px', textDecoration: 'none' }}>Sign Up Free</Link>
          </div>

          <div className="card" style={{ position: 'relative', border: '2px solid #4a6fa5', padding: '32px', textAlign: 'left', borderRadius: '14px', marginTop: '-16px' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, 0)', background: '#1a1a2e', color: '#e8d48a', fontFamily: 'var(--font-body)', fontSize: '11px', padding: '4px 16px', borderRadius: '0 0 8px 8px' }}>Most Popular</div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9aaa', marginBottom: '1rem', marginTop: '1rem' }}>PRO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '48px', color: '#1a1a2e', lineHeight: 1 }}>$29</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#9a9aaa' }}>/month</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
              {["Unlimited coin checks", "Personal API key", "Access to all 50 coins", "PDF export per coin", "Full reasoning breakdown"].map((f,i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#1a1a2e' }}>
                  <span style={{ color: '#4a6fa5' }}>✓</span> {f}
                </div>
              ))}
            </div>
            <button style={{ width: '100%', background: '#4a6fa5', color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Upgrade to Pro</button>
          </div>

          <div className="card" style={{ padding: '32px', textAlign: 'left', borderRadius: '14px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9a9aaa', marginBottom: '1rem' }}>ENTERPRISE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '48px', color: '#1a1a2e', lineHeight: 1 }}>$199</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#9a9aaa' }}>/month</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
              {["Everything in Pro", "White label API", "Bulk PDF export", "Custom certification reports"].map((f,i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#1a1a2e' }}>
                  <span style={{ color: '#4a6fa5' }}>✓</span> {f}
                </div>
              ))}
            </div>
            <button style={{ width: '100%', background: '#ffffff', border: '1px solid #e0e0e8', color: '#1a1a2e', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}>Upgrade to Enterprise</button>
          </div>

        </div>
      </main>
    </div>
  );
}
