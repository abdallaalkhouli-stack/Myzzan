"use client";
import Link from "next/link";
import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/analyze?ticker=${search.toUpperCase()}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section style={{ padding: "6rem 0", textAlign: "center", background: "#f4f4f4" }}>
          <div className="container">
            <div style={{ display: "inline-block", background: "#e8eef6", color: "#4a6fa5", padding: "6px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: "500", marginBottom: "2.5rem", fontFamily: "var(--font-body)" }}>
              <span style={{ marginRight: "6px" }}>●</span> 50 coins screened live
            </div>
            
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "48px", color: "#1a1a2e", marginBottom: "1.5rem" }}>
              Is your crypto <span style={{ color: "#4a6fa5", fontStyle: "italic", fontWeight: 400 }}>halal?</span>
            </h1>
            
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: "#9a9aaa", fontSize: "13px", lineHeight: "1.8", maxWidth: "550px", margin: "0 auto 3.5rem" }}>
              Integrate verified, real-time Halal cryptocurrency data into your platforms seamlessly. 
              Our enterprise-grade API powers the next generation of Islamic finance applications.
            </p>
            
            <div style={{ maxWidth: '550px', margin: '0 auto', background: 'transparent' }}>
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search any coin — BTC, ETH, XLM..." 
                  style={{ flex: 1, padding: '11px 16px', borderRadius: '9px', border: '0.5px solid #e0e0e8', background: '#ffffff', color: '#1a1a2e', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '11px', outline: 'none' }}
                />
                <button 
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '11px 18px', fontSize: '11px' }}
                >
                  Check
                </button>
              </form>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9a9aaa', marginBottom: '0.5rem' }}>
                  See full Sharia analysis, scoring breakdown, and PDF report &rarr;
                </p>
                <Link href="/signup" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#1a1a2e', fontWeight: '500', textDecoration: 'underline' }}>Sign up free</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
