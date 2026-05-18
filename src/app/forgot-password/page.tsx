"use client";

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard`,
    });
    if (error) {
      setMsg(error.message);
    } else {
      setMsg('Check your email for the reset link.');
    }
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
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '28px', color: '#1a1a2e', margin: '0 0 4px 0' }}>Reset Password</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: '#5a7a5a', margin: '0 0 24px 0' }}>Enter your email to receive a secure link.</p>
        
        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <input 
            type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required 
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '0.5px solid #e0e0e8', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px', color: '#1a1a2e', outline: 'none' }} 
            onFocus={e => e.target.style.borderColor = '#4a6fa5'}
            onBlur={e => e.target.style.borderColor = '#e0e0e8'}
          />
          {msg && <div style={{ color: '#1a1a2e', fontSize: '13px', fontFamily: 'var(--font-body)' }}>{msg}</div>}
          <button type="submit" style={{ width: '100%', background: '#4a6fa5', color: '#ffffff', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', padding: '13px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
            Send Reset Link
          </button>
        </form>
        
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/login" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#2a7a4a', textDecoration: 'none' }}>Back to log in</Link>
        </div>
      </div>
    </div>
  );
}
