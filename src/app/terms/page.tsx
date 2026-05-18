"use client";
import Link from 'next/link';
import { Header } from '../components/Header';

export default function TermsOfService() {
  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <Header />
      <main className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', maxWidth: '800px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '32px', color: '#1a1a2e', marginBottom: '24px' }}>
            Terms of Service
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px', lineHeight: '1.7', color: '#1a1a2e', fontWeight: 300 }}>
            <p><strong>Effective Date:</strong> May 18, 2026</p>
            <p>
              By accessing the Myzzan application, data dashboard, or API services, you agree to comply with the terms and conditions outlined below. If you disagree with any part of these terms, please stop using our services immediately.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>1. Permitted Use & API Boundaries</h2>
            <p>
              Free accounts are granted access to spot audits for personal use. Developer plans (Builder/Platform) are issued unique API credentials. You agree not to distribute, white-label, or resell our data feeds without an explicit Platform Tier subscription.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>2. Account Suspension & Abuse</h2>
            <p>
              We reserve the right to suspend or terminate accounts, regenerate or revoke API keys, or ban IP addresses that trigger our security firewalls or perform spam attacks (violating our rate limits of 10 requests per minute).
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>3. Limitation of Liability</h2>
            <p>
              Myzzan provides algorithmic compliance tracking on an "as-is" and "as-available" basis. We offer no guarantees of financial return or religious compliance validity. You agree that Myzzan is not liable for any financial losses or religious concerns arising from your cryptocurrency trades.
            </p>

            <div style={{ borderTop: '0.5px solid #e8e8e8', paddingTop: '20px', marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link href="/" style={{ color: '#4a6fa5', fontWeight: '500' }}>Back to Home</Link>
              <span style={{ color: '#e8e8e8' }}>|</span>
              <Link href="/disclaimer" style={{ color: '#4a6fa5', fontWeight: '500' }}>Sharia Disclaimer</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
