"use client";
import Link from 'next/link';
import { Header } from '../components/Header';

export default function PrivacyPolicy() {
  return (
    <div style={{ background: '#f4f4f4', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <Header />
      <main className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', maxWidth: '800px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '32px', color: '#1a1a2e', marginBottom: '24px' }}>
            Privacy Policy
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px', lineHeight: '1.7', color: '#1a1a2e', fontWeight: 300 }}>
            <p><strong>Effective Date:</strong> May 18, 2026</p>
            <p>
              At Myzzan, we respect your privacy and are committed to protecting it. This Privacy Policy details how we collect, store, and utilize user information across our Sharia compliant data feeds and dashboard portal.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>1. Information We Collect</h2>
            <p>
              We collect minimal information to run our services:
              <br />• **Account Data**: Your email address is stored when you create a login.
              <br />• **API Keys**: Unique tokens generated for builders and developers are securely hashed and stored in our database.
              <br />• **Audit Logs**: We log security-related events (such as logins and API rate-limiting hits) to prevent network abuse.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>2. Data Protection & Encryption</h2>
            <p>
              Your personal data, passwords, and tokens are protected using robust security frameworks:
              <br />• Passwords are encrypted utilizing strong cryptographic hash algorithms via Supabase Auth.
              <br />• API Keys are securely salted and stored inside PostgreSQL RLS-protected columns.
            </p>

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', marginTop: '10px' }}>3. Third-Party Integrations</h2>
            <p>
              We integrate with Stripe for membership settlements and CoinGecko for real-time asset market capitalization statistics. All data transfers strictly utilize SSL encryption and follow high-standard secure practices.
            </p>

            <div style={{ borderTop: '0.5px solid #e8e8e8', paddingTop: '20px', marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link href="/" style={{ color: '#4a6fa5', fontWeight: '500' }}>Back to Home</Link>
              <span style={{ color: '#e8e8e8' }}>|</span>
              <Link href="/terms" style={{ color: '#4a6fa5', fontWeight: '500' }}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
