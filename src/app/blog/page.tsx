"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  category: string;
  content: string;
}

const ARTICLES: Article[] = [
  {
    slug: "bitcoin-halal-or-haram",
    title: "Is Bitcoin Halal or Haram? The Complete Islamic Guide",
    summary: "An in-depth jurisprudential review of Bitcoin under global Islamic Fiqh academies. Exploring the concept of digital property (Maal), currency classification, and volatility constraints.",
    readTime: "6 min read",
    category: "Theology & Fiqh",
    content: `
      <h2>Introduction: The Digital Currency Dilemma</h2>
      <p>The meteoric rise of Bitcoin and decentralized blockchain technologies has sparked one of the most intense jurisprudential debates in modern Islamic finance history. Muslims around the world, representing over a quarter of the global population, are seeking definitive answers: is Bitcoin Sharia-compliant (Halal), or is it prohibited (Haram)? To answer this, contemporary Islamic scholars and Fiqh academies have analyzed Bitcoin's utility, supply, governance, and mechanics against core Sharia parameters: Riba (interest), Gharar (excessive uncertainty), and Maysir (gambling).</p>
      
      <h2>1. The Concept of Digital Property (Māl)</h2>
      <p>Under classical Islamic jurisprudence, for an object to be considered as a medium of exchange or tradeable asset, it must possess the qualities of *Māl* (wealth/property) and *Mutaqawwim* (having valuable utility). Early scholars defined property as something tangible that could be stored or possessed physically. However, modern consensus among progressive finance bodies, including the Shariah Advisory Council of the Securities Commission Malaysia and Amanie Advisors, has expanded this definition to incorporate digital assets. They argue that as long as an asset possesses utility, can be secured electronically, and has commercial value acknowledged by customary usage (*'Urf*), it satisfies the conditions of *Māl*.</p>
      
      <h2>2. Arguments for Permissibility (Halal)</h2>
      <p>Prominent contemporary scholars, such as Mufti Faraz Adam and organizations like the Islamic Finance Advisory (IFG), argue that Bitcoin is fundamentally permissible. Their reasoning is anchored on several key principles:</p>
      <ul>
        <li><strong>Lack of Riba (Usury):</strong> Unlike fiat currencies which are tied to debt-based fractional reserve banking, Bitcoin is minted through computational Proof of Work. It does not generate interest on its own.</li>
        <li><strong>Real Network Utility:</strong> The Bitcoin network functions as a trustless, global, peer-to-peer settlement registry. The token (BTC) is required to pay network transaction fees, representing a real cryptographic utility.</li>
        <li><strong>Customary Recognition ('Urf):</strong> Millions of users globally accept BTC as a store of value and medium of exchange, giving it customary validation.</li>
      </ul>
      <p>Furthermore, the International Islamic Fiqh Academy (IIFA) Resolution 237 has acknowledged that digital currencies can be classified as financial assets, provided they do not involve illegal activities or interest mechanisms.</p>

      <h2>3. Arguments for Prohibition (Haram)</h2>
      <p>Conversely, institutional bodies like Egypt’s Dar al-Ifta, Turkey’s Diyanet, and the Shariah Board of MUI Indonesia have issued warnings or fatwas prohibiting cryptocurrency trading. Their primary objections are:</p>
      <ul>
        <li><strong>Excessive Volatility (Gharar):</strong> Sudden price spikes and crashes make Bitcoin highly speculative, posing high risks of wealth destruction.</li>
        <li><strong>Lack of Sovereign Backing:</strong> Traditional Sharia principles state that money must be issued or backed by a sovereign state authority (Sultan) to prevent counterfeiting and ensure public safety.</li>
        <li><strong>Facilitation of Haram Activities:</strong> Pseudonymity can lead to exploitation in money laundering or illegal trade.</li>
      </ul>

      <h2>4. Comparative Scholarly Verdict</h2>
      <p>To summarize, the consensus has split into two major streams. While conservative state councils raise objections based on sovereign control and consumer risk, specialized Islamic fintech advisors and decentralized finance panels lean strongly towards permissibility. They view Bitcoin as a digital commodity, similar to gold, which can be acquired and exchanged, with users bearing the market volatility risk naturally.</p>
      <p style="margin-top: 1.5rem;"><a href="/analyze?ticker=BTC" style="color: #4a6fa5; font-weight: 500; text-decoration: underline;">Analyze Bitcoin's Live Sharia Rating &rarr;</a></p>
    `
  },
  {
    slug: "top-10-halal-cryptocurrencies",
    title: "Top 10 Halal Cryptocurrencies to Watch in 2026",
    summary: "A curated analysis of premium Layer-1 and payment protocols that satisfy the strictest Sharia compliance criteria, boasting rich utility and lack of interest dynamics.",
    readTime: "5 min read",
    category: "Market Insights",
    content: `
      <h2>Defining the Halal Standard in Crypto Portfolios</h2>
      <p>When constructing a Sharia-compliant digital asset portfolio, investor criteria must extend far beyond simple price predictions. To align with Islamic values, tokens must pass rigorous evaluations ensuring the absence of interest-based yields (*Riba*), excessive speculation (*Gharar*), and gambling elements (*Maysir*). Here we profile the top protocols that currently pass Myzzan's strict Sharia screening matrix, showcasing authentic cryptographic utility and institutional backing.</p>

      <h2>1. Bitcoin (BTC) - Digital Commodity</h2>
      <p>As the pioneer of cryptocurrency, Bitcoin is widely recognized by scholars as a digital commodity. Lacking a central issuer, it is secured by global Proof-of-Work mining, presenting a highly transparent ledger without interest-bearing debt.</p>

      <h2>2. Stellar (XLM) - Certified Payment Network</h2>
      <p>Stellar stands out as one of the few projects with explicit institutional Sharia certification. In 2018, the Stellar Foundation secured official certification from the Shariah Review Bureau (SRB) in Bahrain, validating its platform for international payments and asset tokenization.</p>

      <h2>3. Ethereum (ETH) - Smart Contract Infrastructure</h2>
      <p>Ethereum functions as the primary decentralized world computer. While PoS staking has raised minor scholarly discussions on staking returns, general consensus (Amanie Advisors) permits holding ETH due to its massive utility in transaction fees, decentralized computing, and hosting smart contracts.</p>

      <h2>4. Islamic Coin (ISLM) - Sharia-First Blockchain</h2>
      <p>Built on the Haqq Network, Islamic Coin is designed explicitly to serve the global Muslim community. Governed by a board of renowned Sharia scholars (including Sheikh Dr. Nizam Yaquby), it donates 10% of every minted coin to a community Evergreen DAO for Islamic charity and philanthropic grants.</p>

      <h2>5. Solana (SOL) - High-Throughput Layer 1</h2>
      <p>Boasting unparalleled transaction speeds, Solana provides foundational digital commodity infrastructure. Staking yields on Solana reflect hardware validation services, which are widely accepted under Islamic leasing rules (*Ijarah*).</p>

      <h2>6. Cardano (ADA) - Scientific Peer-Reviewed L1</h2>
      <p>Cardano's development follows strict academic peer reviews. Its Proof-of-Stake mechanism allows token delegation without lock-up or lending risk, matching Islamic partnership principles (*Musharakah*).</p>

      <h2>7. Polkadot (DOT) - Interoperability Hub</h2>
      <p>Polkadot connects multiple blockchains into a unified network. DOT is utilized for governance and slot auctions, providing clear utility and avoiding fractional reserve yields.</p>

      <h2>8. Algorand (ALGO) - Carbon-Negative Infrastructure</h2>
      <p>Designed with institutional compliance in mind, Algorand is a carbon-negative L1. Its high transparency and transaction efficiency support legitimate trade and tokenized commercial transactions.</p>

      <h2>9. Chainlink (LINK) - Decentralized Oracle System</h2>
      <p>Decentralized oracles are critical to importing real-world data onto smart contracts. LINK tokens represent utility payments directly to data node operators, a clear fee-for-service model (*Ujrah*).</p>

      <h2>10. Uniswap (UNI) - Decentralized Exchange Governance</h2>
      <p>While some liquidity pools on DEXs may contain interest-bearing stablecoins, the UNI governance token itself is Sharia-compliant, representing a share of vote in decentralized platform utility.</p>
      
      <p style="margin-top: 1.5rem;"><a href="/pricing" style="color: #4a6fa5; font-weight: 500; text-decoration: underline;">Unlock Unlimited Portfolio Analysis with Myzzan Investor &rarr;</a></p>
    `
  },
  {
    slug: "what-makes-crypto-halal",
    title: "What Makes a Crypto Halal? Understanding Sharia Compliance",
    summary: "Unlocking the technical parameters of the Myzzan Sharia Engine. Learn how we scan smart contracts and websites for Riba, Gharar, Maysir, and Haram Industry exposure.",
    readTime: "4 min read",
    category: "Methodology",
    content: `
      <h2>The Framework of Islamic Finance in the Digital Era</h2>
      <p>To determine if a cryptocurrency is Halal, scholars do not look at the price chart. Instead, they conduct a rigorous multi-stage audit of the protocol's business model, codebase, legal entity, and token distribution rules. The Myzzan Sharia Engine automated this process by mapping contemporary Fiqh resolutions into six quantitative screening pillars. Understanding these pillars is essential for any modern ethical investor.</p>

      <h2>1. The Utility Test (25% Weight)</h2>
      <p>Does the token represent a legitimate service, commodity, or network payment? A coin that has no utility other than speculative trading fails the Utility Test. Legitimate tokens are used for validator staking, smart contract fee payments, or distributed governance voting.</p>

      <h2>2. The Riba (Interest) Scan (25% Weight)</h2>
      <p>Riba is strictly prohibited under Islamic law. We scan the project description and whitepapers for indicators of interest-based lending or borrowing. DeFi lending protocols that spread returns based on interest rates automatically trigger our Riba blocker, scoring 0 on this test.</p>

      <h2>3. The Gharar (Uncertainty) Scan (20% Weight)</h2>
      <p>Gharar refers to excessive risk arising from deceit, lack of information, or extreme price manipulation. Memecoins that are created as 'jokes' with no whitepapers or development teams fail this scan due to severe information asymmetry and zero core utility.</p>

      <h2>4. The Maysir (Gambling) Scan (15% Weight)</h2>
      <p>If an asset's revenue model depends on casino gaming, lottery draws, or luck-based staking rewards, it constitutes Maysir. Sharia requires wealth to be created through productive enterprise and risk-sharing, not random chance.</p>

      <h2>5. The Haram Industry Filter (10% Weight)</h2>
      <p>We perform database scans to verify that the coin is not affiliated with prohibited sectors. These include conventional banking, adult entertainment, weapons manufacturing, alcohol production, and pork-related industries.</p>

      <h2>6. The Transparency Check (5% Weight)</h2>
      <p>Does the project have public, verifiable founders (Named Team)? Is the source code open-source on GitHub? Is the project registered in a recognized legal jurisdiction? Projects that are completely anonymous with closed-source code represent high risks of fraud, failing the Transparency check.</p>
      
      <p style="margin-top: 1.5rem;"><a href="/analyze" style="color: #4a6fa5; font-weight: 500; text-decoration: underline;">Scan Your First Coin Today &rarr;</a></p>
    `
  }
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)" }}>
      <Header />
      
      <main className="container" style={{ paddingTop: "4rem", paddingBottom: "6rem", maxWidth: "900px", flex: 1 }}>
        
        {/* Article Details View */}
        {selectedArticle ? (
          <div className="card" style={{ padding: "40px" }}>
            {/* Back Button */}
            <button 
              onClick={() => setSelectedArticle(null)}
              style={{ background: "none", border: "none", color: "#4a6fa5", fontSize: "13px", fontWeight: "500", cursor: "pointer", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "6px" }}
            >
              ← Back to articles
            </button>

            {/* Meta */}
            <div style={{ display: "flex", gap: "12px", fontSize: "11px", color: "#9a9aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
              <span>{selectedArticle.category}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", color: "#1a1a2e", marginBottom: "2rem", lineHeight: "1.2" }}>
              {selectedArticle.title}
            </h1>

            {/* Content Renderer */}
            <div 
              style={{ fontSize: "14px", lineHeight: "1.8", color: "#1a1a2e", fontWeight: "300" }}
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
          </div>
        ) : (
          // Main List View
          <div>
            {/* Title Block */}
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "42px", color: "#1a1a2e", marginBottom: "10px" }}>
                Myzzan Insights
              </h1>
              <p style={{ color: "#9a9aaa", fontSize: "13px", fontWeight: "300" }}>
                Academic research and updates on Sharia compliance, blockchain mechanics, and modern Islamic finance.
              </p>
            </div>

            {/* Articles List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {ARTICLES.map(article => (
                <div 
                  key={article.slug} 
                  className="card" 
                  style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
                  onClick={() => setSelectedArticle(article)}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "10px", color: "#4a6fa5", background: "#e8eef6", padding: "2px 8px", borderRadius: "4px", fontWeight: "600", textTransform: "uppercase" }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: "11px", color: "#9a9aaa" }}>{article.readTime}</span>
                  </div>
                  
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "#1a1a2e", marginBottom: "12px", lineHeight: "1.3" }}>
                    {article.title}
                  </h2>
                  
                  <p style={{ color: "#9a9aaa", fontSize: "13px", fontWeight: "300", lineHeight: "1.6", marginBottom: "1rem" }}>
                    {article.summary}
                  </p>

                  <span style={{ fontSize: "12px", color: "#4a6fa5", fontWeight: "600" }}>
                    Read Full Article &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
      
      <Footer />
    </div>
  );
}
