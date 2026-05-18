"use client";
import Link from 'next/link';
import { Header } from '../components/Header';

export default function CookiePolicy() {
  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <Header />
      <main className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', maxWidth: '800px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '32px', color: '#1a1a2e', marginBottom: '24px' }}>
            Cookie Policy
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px', lineHeight: '1.7', color: '#1a1a2e', fontWeight: 300 }}>
            <p><strong>Effective Date:</strong> May 18, 2026</p>
            <p>
              At Myzzan, we believe in complete transparency and maximum security. Our website and developer console utilize only **strictly essential cookies** to run secure sessions.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>1. What are Essential Cookies?</h2>
            <p>
              Essential cookies are required to authenticate your identity and keep you securely logged in as you browse between your account settings, the developers coin listing dashboard, and check API key states.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>2. No Tracking or Advertising</h2>
            <p>
              We do **not** utilize any cookies for advertisement campaigns, user profiling, or third-party marketing analytics. Your browsing activities inside our Sharia engine remain confidential.
            </p>

            <div style={{ borderTop: '0.5px solid #e8e8e8', paddingTop: '20px', marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link href="/" style={{ color: '#4a6fa5', fontWeight: '500' }}>Back to Home</Link>
              <span style={{ color: '#e8e8e8' }}>|</span>
              <Link href="/privacy" style={{ color: '#4a6fa5', fontWeight: '500' }}>Privacy Policy</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
