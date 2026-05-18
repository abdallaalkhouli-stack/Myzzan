"use client";

import React, { useState } from "react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export function WaitlistModal({ isOpen, onClose, featureName }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `modal_${featureName || "locked_feature"}` }),
      });
      const data = await res.json();
      
      setMessage(data.message);
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch {
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(26, 26, 46, 0.4)", backdropFilter: "blur(4px)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 2000, padding: "20px"
    }}>
      <div style={{
        background: "#ffffff", border: "0.5px solid #e8e8e8",
        borderRadius: "16px", padding: "32px", maxWidth: "450px",
        width: "100%", position: "relative", boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "none", border: "none", fontSize: "18px",
            color: "#9a9aaa", cursor: "pointer", outline: "none"
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "#e8eef6", color: "#4a6fa5", padding: "4px 12px", borderRadius: "20px", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
            Coming Soon
          </div>
          
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "#1a1a2e", marginBottom: "10px", fontWeight: "600" }}>
            Access {featureName || "Premium Feature"}
          </h3>
          
          <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#9a9aaa", fontWeight: 300, lineHeight: "1.6", marginBottom: "24px" }}>
            This feature will be available in the full launch. Join our exclusive waitlist to be among the first to get early access.
          </p>

          {isSuccess ? (
            <div style={{ color: "#2a7a4a", fontSize: "13px", fontWeight: "500", background: "#eaf6ee", padding: "12px", borderRadius: "8px" }}>
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "8px",
                  border: "0.5px solid #e0e0e8", fontFamily: "var(--font-body)",
                  fontSize: "13px", outline: "none"
                }}
              />
              {message && (
                <div style={{ color: "#c0392b", fontSize: "12px", fontWeight: "500" }}>
                  {message}
                </div>
              )}
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%", padding: "12px", borderRadius: "8px" }}
              >
                {loading ? "Joining..." : "Join the Waitlist"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
