"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function BetaBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bannerClosed = localStorage.getItem("myzzan_beta_banner_closed");
    if (!bannerClosed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("myzzan_beta_banner_closed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      background: "#4a6fa5", color: "#ffffff", height: "36px",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", fontFamily: "var(--font-body)", fontSize: "12px",
      fontWeight: 400, padding: "0 40px", zIndex: 1050
    }}>
      <span>
        🚀 Myzzan Beta — Full access launching soon ·{" "}
        <Link href="/waitlist" style={{ color: "#ffffff", textDecoration: "underline", fontWeight: 500 }}>
          Join the waitlist →
        </Link>
      </span>
      <button 
        onClick={handleClose}
        style={{
          position: "absolute", right: "16px", top: "50%",
          transform: "translateY(-50%)", background: "none", border: "none",
          color: "#ffffff", fontSize: "14px", cursor: "pointer", outline: "none"
        }}
      >
        ✕
      </button>
    </div>
  );
}
