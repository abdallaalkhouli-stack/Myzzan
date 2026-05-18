"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '../../../components/Header';
import { WaitlistModal } from '../../../components/WaitlistModal';

export default function CoinDetail() {
  const params = useParams();
  const ticker = params.ticker as string;
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const res = await fetch('/api/v1/indices/halal', { headers: { 'Authorization': 'Bearer sk_live_halal_8f92a4c10eb3d45f' } });
        const data = await res.json();
        if (data.success) {
          const found = data.data.assets.find((c: any) => c.symbol.toLowerCase() === ticker.toLowerCase());
          setCoin(found);
        }
      } catch (err) {} finally { setLoading(false); }
    }
    fetchCoin();
  }, [ticker]);

  const criteria = [
    { key: "riba", label: "No Riba (Interest)" },
    { key: "gharar", label: "No Gharar (Excessive Speculation)" },
    { key: "maysir", label: "No Maysir (Gambling)" },
    { key: "haram_industry", label: "No Haram Industry Exposure" },
    { key: "utility", label: "Real Utility / Asset Backing" },
    { key: "transparency", label: "Transparent & Auditable" }
  ];

  const checkStatus = (key: string, status: string) => {
    if (status === 'halal') return true;
    if (status === 'haram' && (key === 'utility' || key === 'gharar')) return false;
    if (status === 'haram') return true;
    if (status === 'doubtful' && (key === 'riba' || key === 'gharar')) return false;
    return true;
  };

  const handleDownloadPDF = () => {
    setModalOpen(true);
  };

  if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center', fontFamily: 'var(--font-body)', color: '#1a1a2e' }}>Loading analysis...</div>;
  if (!coin) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Asset not found.</div>;

  const analysis = coin.sharia_analysis;

  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh' }}>
      <Header />
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', gap: '3rem' }}>
          
          <div style={{ width: '35%' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <img src={coin.image} alt={coin.name} width={72} height={72} style={{ borderRadius: '50%', marginBottom: '1rem' }} />
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '28px', color: '#1a1a2e', margin: '0 0 4px 0' }}>{coin.name}</h1>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#9a9aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{coin.symbol}</div>
              
              <div style={{ marginBottom: '2rem' }}>
                <span className={`badge badge-${analysis.status}`} style={{ fontSize: '14px', padding: '0 24px', lineHeight: '48px', height: '48px', minWidth: '120px' }}>
                  {analysis.status === 'halal' ? '✓ Halal' : analysis.status === 'haram' ? '✗ Haram' : '⚠ Doubtful'}
                </span>
              </div>
              
              <div style={{ height: '0.5px', background: '#e8e8e8', width: '100%', marginBottom: '1.5rem' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: '#9a9aaa', letterSpacing: '0.14em', marginBottom: '4px' }}>Confidence</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: '#1a1a2e', textTransform: 'capitalize' }}>{analysis.confidence}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: '#9a9aaa', letterSpacing: '0.14em', marginBottom: '4px' }}>Certified By</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: '#1a1a2e' }}>{analysis.certified_by || 'Review Needed'}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: '#9a9aaa', letterSpacing: '0.14em', marginBottom: '4px' }}>Price</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: '#1a1a2e' }}>${coin.current_price.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: '#9a9aaa', letterSpacing: '0.14em', marginBottom: '4px' }}>Market Cap</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: '#1a1a2e' }}>${(coin.market_cap / 1e9).toFixed(1)}B</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '65%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '20px', color: '#1a1a2e', margin: 0 }}>AI Verdict Breakdown</h2>
              <button onClick={handleDownloadPDF} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '10px' }}>Export PDF</button>
            </div>
            
            <div className="card" style={{ marginBottom: '2rem' }}>
              {analysis.reasoning.map((r: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i === analysis.reasoning.length - 1 ? 'none' : '0.5px solid #f0f0f0' }}>
                  <span style={{ color: '#4a6fa5', fontSize: '14px' }}>→</span>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#1a1a2e', lineHeight: 1.8 }}>{r}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: '#9a9aaa', letterSpacing: '0.14em', marginBottom: '1rem' }}>Sharia Criteria Checklist</div>
            
            <div className="card" style={{ padding: '16px' }}>
              {criteria.map(c => {
                const pass = checkStatus(c.key, analysis.status);
                return (
                  <div key={c.key} style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 16px', borderRadius: '4px', marginBottom: '8px',
                    background: pass ? '#f4f4f4' : '#faeaea',
                    borderLeft: pass ? '2px solid #4a6fa5' : '2px solid #c0392b'
                  }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px', color: '#1a1a2e' }}>{c.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '12px', color: pass ? '#4a6fa5' : '#c0392b' }}>
                      {pass ? '✓ Pass' : '✗ Fail'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* HIDDEN PDF CONTENT STRUCTURE */}
        <div id="pdf-content" style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '800px', background: '#ffffff', padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 600, color: '#1a1a2e' }}>Myzzan</span>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 500, color: '#1a1a2e' }}>
              Sharia Compliance Report
            </div>
          </div>
          <div style={{ height: '1.5px', width: '100%', background: '#4a6fa5', marginBottom: '8px' }} />
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 300, color: '#9a9aaa', textAlign: 'right', marginBottom: '30px' }}>
            Date: {new Date().toLocaleDateString()}
          </div>
          
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ width: '30%', textAlign: 'center' }}>
              <img src={coin.image} alt={coin.name} width={64} height={64} style={{ borderRadius: '50%', marginBottom: '10px' }} />
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: '24px', color: '#1a1a2e', margin: '0 0 4px 0' }}>{coin.name}</h1>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '11px', color: '#9a9aaa', textTransform: 'uppercase', marginBottom: '20px' }}>{coin.symbol}</div>
              
              <span className={`badge badge-${analysis.status}`} style={{ display: 'inline-block', fontSize: '12px', padding: '8px 20px', borderRadius: '20px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                {analysis.status === 'halal' ? '✓ Halal' : analysis.status === 'haram' ? '✗ Haram' : '⚠ Doubtful'}
              </span>
            </div>

            <div style={{ width: '70%' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: '18px', color: '#1a1a2e', margin: '0 0 10px 0' }}>AI Verdict Breakdown</h2>
              <div style={{ marginBottom: '20px' }}>
                {analysis.reasoning.map((r: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 0', borderBottom: '0.5px solid #f0f0f0' }}>
                    <span style={{ color: '#4a6fa5', fontSize: '12px' }}>→</span>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '12px', color: '#1a1a2e', lineHeight: 1.8 }}>{r}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: '#9a9aaa', letterSpacing: '0.14em', marginBottom: '10px' }}>Criteria Checklist</div>
              <div>
                {criteria.map(c => {
                  const pass = checkStatus(c.key, analysis.status);
                  return (
                    <div key={c.key} style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 14px', borderRadius: '4px', marginBottom: '6px',
                      background: pass ? '#f4f4f4' : '#faeaea',
                      borderLeft: pass ? '2px solid #4a6fa5' : '2px solid #c0392b'
                    }}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', color: '#1a1a2e' }}>{c.label}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '11px', color: pass ? '#4a6fa5' : '#c0392b' }}>
                        {pass ? '✓ Pass' : '✗ Fail'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '40px', height: '0.5px', width: '100%', background: '#e8e8e8', marginBottom: '10px' }} />
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 300, color: '#9a9aaa', textAlign: 'center' }}>
            Disclaimer: This report is generated by an AI-powered Sharia analysis engine. It is for informational purposes only. Consult a qualified Islamic finance scholar.
          </div>
        </div>

      </div>
      <WaitlistModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        featureName="Sharia Audit PDF Export" 
      />
    </div>
  );
}
