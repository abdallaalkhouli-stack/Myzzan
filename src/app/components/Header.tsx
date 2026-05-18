"use client";
import Link from "next/link";

export function Header() {
  return (
    <header className="header">
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
        <nav className="nav-links">
          <Link href="/dashboard/coins" className="nav-link">Index</Link>
          <Link href="/dashboard" className="nav-link">API</Link>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="#" className="nav-link">Docs</Link>
        </nav>
        <div>
          <Link href="/signup" className="btn btn-primary">
            Get API Key
          </Link>
        </div>
      </div>
    </header>
  );
}
