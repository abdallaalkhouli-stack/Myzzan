"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function Footer() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("myzzan_cookies_accepted");
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("myzzan_cookies_accepted", "true");
    setShowBanner(false);
  };

  return (
    <>
      <footer style={{ background: "#f4f4f4", borderTop: "0.5px solid #e8e8e8", padding: "3rem 0", marginTop: "auto", fontFamily: "var(--font-body)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ fontSize: "12px", color: "#9a9aaa", fontWeight: 300 }}>
            © {new Date().getFullYear()} Myzzan. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "20px", fontSize: "12px", color: "#9a9aaa" }}>
            <Link href="/disclaimer">Sharia Disclaimer</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </footer>

      {showBanner && (
        <div style={{
          position: "fixed", bottom: "24px", left: "24px", right: "24px",
          background: "#1a1a2e", color: "#ffffff", border: "0.5px solid #4a6fa5",
          borderRadius: "12px", padding: "16px 24px", zIndex: 1000,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          maxWidth: "800px", margin: "0 auto"
        }}>
          <div style={{ fontSize: "12px", fontWeight: 300, color: "#e8eef6", flex: 1 }}>
            We use essential cookies only to maintain secure authentication and core session stability. No tracking or marketing advertising is conducted.{" "}
            <Link href="/cookies" style={{ color: "#4a6fa5", textDecoration: "underline" }}>Learn more</Link>
          </div>
          <button 
            onClick={handleAccept} 
            className="btn btn-primary" 
            style={{ padding: "8px 16px", borderRadius: "6px", fontSize: "11px" }}
          >
            Accept
          </button>
        </div>
      )}
    </>
  );
}
