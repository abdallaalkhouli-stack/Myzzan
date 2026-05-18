"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Logging in...');
    setTimeout(() => window.location.href = '/dashboard', 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f4f4f4' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#ffffff', border: '0.5px solid #e8e8e8', borderRadius: '14px', padding: '40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '28px', color: '#1a1a2e', margin: '0 0 4px 0' }}>Welcome back</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#5a7a5a', margin: '0 0 24px 0' }}>Log in to access your dashboard.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <input 
            type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required 
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '0.5px solid #e0e0e8', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px', color: '#1a1a2e', outline: 'none' }} 
            onFocus={e => e.target.style.borderColor = '#4a6fa5'}
            onBlur={e => e.target.style.borderColor = '#e0e0e8'}
          />
          <input 
            type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required 
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '0.5px solid #e0e0e8', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px', color: '#1a1a2e', outline: 'none' }} 
            onFocus={e => e.target.style.borderColor = '#4a6fa5'}
            onBlur={e => e.target.style.borderColor = '#e0e0e8'}
          />
          {msg && <div style={{ color: '#1a1a2e', fontSize: '13px', fontFamily: 'var(--font-body)' }}>{msg}</div>}
          <button type="submit" style={{ width: '100%', background: '#4a6fa5', color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', padding: '13px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
            Sign In
          </button>
        </form>
        
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/forgot-password" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#2a7a4a', textDecoration: 'none' }}>Forgot password?</Link>
          <Link href="/signup" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#2a7a4a', textDecoration: 'none' }}>Create account</Link>
        </div>
      </div>
    </div>
  );
}
