"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BetaBanner } from "./BetaBanner";
import { WaitlistModal } from "./WaitlistModal";

export function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <BetaBanner />
      <header className="header" style={{ position: "relative", zIndex: 1000 }}>
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
            <Link href="/analyze" className="nav-link">Analyze</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <button 
              onClick={() => setModalOpen(true)} 
              className="nav-link" 
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Docs
            </button>
          </nav>
          <div>
            <Link 
              href="/waitlist" 
              className="btn" 
              style={{
                background: "#4a6fa5", color: "#ffffff", padding: "8px 20px",
                borderRadius: "8px", fontFamily: "var(--font-body)", fontSize: "12px",
                fontWeight: 500, textDecoration: "none", display: "inline-block"
              }}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </header>

      <WaitlistModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        featureName="Developer Documentation" 
      />
    </>
  );
}
