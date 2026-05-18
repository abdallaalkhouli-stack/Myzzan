"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tier, setTier] = useState<string>('FREE');
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState(false);
  const [usage, setUsage] = useState({ used: 0, limit: 10 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      
      setUser(session.user);

      const { data: uData } = await supabase.from('users').select('tier').eq('id', session.user.id).single();
      if (uData) setTier(uData.tier);

      const { data: keyData } = await supabase.from('api_keys').select('*').eq('user_id', session.user.id).single();
      if (keyData) {
        setApiKey(keyData.key_hash);
        setUsage({ used: keyData.calls_today, limit: keyData.limit_per_day });
      }

      setLoading(false);
    }
    loadData();
  }, [router]);

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleRegenerate = async () => {
    if (!confirm('Are you sure? Your old API key will stop working immediately.')) return;
    const newKey = 'sk_live_' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
    
    await supabase.from('api_keys').update({ key_hash: newKey }).eq('user_id', user.id);
    setApiKey(newKey);
    alert('API Key regenerated successfully.');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'var(--font-body)', color: '#1a1a2e' }}>Loading dashboard...</div>;

  const maskedKey = apiKey ? `${apiKey.substring(0, 10)}****${apiKey.substring(apiKey.length - 4)}` : 'No API Key generated';

  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh' }}>
      <header className="header" style={{ borderBottom: 'none' }}>
        <div className="container header-content">
          <Link href="/" className="logo-container" style={{ gap: '10px' }}>
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
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '600', color: '#1a1a2e', letterSpacing: '0.02em' }}>Myzzan</span>
          </Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', color: '#9a9aaa', fontSize: '13px' }}>{user?.email}</span>
            <button onClick={handleSignout} style={{ background: '#ffffff', border: '1px solid #e0e0e8', color: '#5a7a5a', fontFamily: 'var(--font-body)', fontSize: '12px', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Sign out</button>
          </div>
        </div>
      </header>
      <div style={{ height: '0.5px', width: '100%', backgroundColor: '#e8e8e8' }} />

      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '1000px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#9a9aaa', marginBottom: '4px' }}>Welcome back</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '24px', color: '#1a1a2e' }}>{user?.email}</h1>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          
          <div className="card" style={{ padding: '24px', borderLeft: '3px solid #b8940a' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '10px', textTransform: 'uppercase', color: '#9a9aaa', letterSpacing: '0.12em', marginBottom: '8px' }}>Your Plan</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '32px', color: '#1a1a2e' }}>
              {tier === 'FREE' ? 'Free Tier' : tier === 'PRO' ? 'Pro Account' : 'Enterprise'}
            </div>
          </div>

          <div className="card" style={{ padding: '24px', borderLeft: '3px solid #b8940a' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '10px', textTransform: 'uppercase', color: '#9a9aaa', letterSpacing: '0.12em', marginBottom: '8px' }}>Usage Today</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '32px', color: '#1a1a2e' }}>
              {usage.used} <span style={{ fontSize: '16px', color: '#9a9aaa', fontFamily: 'var(--font-body)', fontWeight: 300 }}>/ {usage.limit > 1000000 ? '∞' : usage.limit} reqs</span>
            </div>
          </div>

        </div>

        <div className="card" style={{ padding: '24px', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '12px', textTransform: 'uppercase', color: '#9a9aaa', marginBottom: '16px' }}>Your API Key</h2>
          {tier === 'FREE' ? (
            <div style={{ padding: '16px', background: '#faeaea', borderRadius: '8px', color: '#7a1a1a', border: '1px solid #d8a0a0', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
              API Keys are only available on PRO or ENTERPRISE plans.
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <code style={{ flex: 1, fontFamily: 'monospace', fontSize: '13px', fontWeight: 300, color: '#1a1a2e', background: '#f4f4f4', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '12px 16px' }}>
                  {showKey ? apiKey : maskedKey}
                </code>
                <button onClick={() => setShowKey(!showKey)} style={{ background: '#ffffff', border: '1px solid #e0e0e8', color: '#5a7a5a', fontFamily: 'var(--font-body)', fontSize: '12px', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                  {showKey ? 'Hide' : 'Reveal'}
                </button>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9a9aaa' }}>
                  Keep this key secret. Do not expose it in client-side code.
                </p>
                <button onClick={handleRegenerate} style={{ background: '#ffffff', border: '1px solid #e0e0e8', color: '#5a7a5a', fontFamily: 'var(--font-body)', fontSize: '12px', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Regenerate Key</button>
              </div>
            </>
          )}
        </div>

        {tier === 'FREE' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#eaf6ee', border: '1px solid #b0d4b8', borderRadius: '12px', padding: '24px', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '24px', color: '#1a6a3a', marginBottom: '4px' }}>Upgrade to PRO</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#2a5a2a' }}>Get a personal API key, unlimited coin checks, and PDF reports.</p>
            </div>
            <Link href="/pricing" style={{ background: '#4a6fa5', color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>View Pricing</Link>
          </div>
        )}

        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '20px', color: '#1a1a2e', marginBottom: '4px' }}>Explore the AI Sharia Engine</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#5a7a5a' }}>Browse the top 50 cryptocurrencies and their Sharia compliance verdicts.</p>
          </div>
          <Link href="/dashboard/coins" style={{ background: '#ffffff', border: '1px solid #e0e0e8', color: '#1a1a2e', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
            Open Coins Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
