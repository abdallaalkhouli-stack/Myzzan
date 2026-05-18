"use client";
import Link from 'next/link';
import { Header } from '../components/Header';

export default function ShariaDisclaimer() {
  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <Header />
      <main className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', maxWidth: '800px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '32px', color: '#1a1a2e', marginBottom: '24px' }}>
            Sharia Disclaimer & Methodology Limitations
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px', lineHeight: '1.7', color: '#1a1a2e', fontWeight: 300 }}>
            <p style={{ fontWeight: 500, color: '#7a1a1a', background: '#faeaea', border: '1px solid #d8a0a0', padding: '16px', borderRadius: '8px' }}>
              <strong>IMPORTANT:</strong> Myzzan uses artificial intelligence and deep metadata harvesting to analyze cryptocurrency assets based on published Islamic scholarly opinions and standards (including IIFA, AAOIFI, and Dar al-Ifta). This platform is built for informational and educational purposes only and does NOT constitute a fatwa or formal religious ruling.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>1. No Authority to Issue Fatwas</h2>
            <p>
              Myzzan, its developers, and its parent corporations do not claim any authority to issue fatwas or construct binding Sharia jurisprudential opinions. All compliance scores and categorizations are derived from applying rule-based templates based on published research papers and fatwa translations of recognized Islamic finance experts (such as Mufti Taqi Usmani, Mufti Faraz Adam, and international Fiqh councils).
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>2. Consult Qualified Advisors</h2>
            <p>
              Cryptocurrency markets are highly volatile, speculative, and continuously evolving. Users are strictly urged and required to consult their own trusted local Sharia scholars and qualified Islamic finance advisors prior to allocating capital to any digital assets or participating in decentralized liquidity systems.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>3. Data Sourcing and AI Constraints</h2>
            <p>
              Our Sharia Engine analyzes business whitepapers, website declarations, smart contracts, and market volumes to scan for riba, gharar, maysir, and haram industry exposure. While we strive to maintain high accuracy through comprehensive metadata checks, AI and algorithmic keyword scanners are subject to data capture gaps or interpretation limits.
            </p>

            <div style={{ borderTop: '0.5px solid #e8e8e8', paddingTop: '20px', marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link href="/" style={{ color: '#4a6fa5', fontWeight: '500' }}>Back to Home</Link>
              <span style={{ color: '#e8e8e8' }}>|</span>
              <Link href="/pricing" style={{ color: '#4a6fa5', fontWeight: '500' }}>View Plans</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
