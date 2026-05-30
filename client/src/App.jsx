

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import LoadingState from "./components/LoadingState";
import PriceSummaryCard from "./components/PriceSummaryCard";
import RecommendationCard from "./components/RecommendationCard";
import PriceChart from "./components/PriceChart";
import ProductTable from "./components/ProductTable";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("https://anakin-hawkeye-api.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.app}>
      {/* Background grid */}
      <div style={styles.grid} aria-hidden="true" />

      {/* Top nav */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          🦅 <span style={{ color: "var(--accent)" }}>HawkEye</span> AI
        </div>
      </nav>

      <main style={styles.main}>
        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <LoadingState />}

        {error && (
          <div style={styles.errorBox}>
            <span>⚠️ {error}</span>
          </div>
        )}

        {result && !loading && (
          <div style={styles.results}>
            {/* Row 1: Summary + Recommendation */}
            <div style={styles.topGrid}>
              <PriceSummaryCard
                marketSummary={result.market_summary}
                product={result.product}
              />
              <RecommendationCard
                recommendation={result.recommendation}
                aiInsight={result.ai_insight}
              />
            </div>

            {/* Row 2: Price chart */}
            {result.products?.length > 0 && (
              <PriceChart
                products={result.products}
                avgPrice={result.market_summary.avg_price}
              />
            )}

            {/* Row 3: Product table */}
            {result.products?.length > 0 && (
              <ProductTable products={result.products} />
            )}

            {/* Footer meta */}
            <div style={styles.meta}>
              <span>Query: <code style={styles.code}>"{result.original_query}"</code></span>
              <span>→</span>
              <span>Extracted: <code style={styles.code}>"{result.product}"</code></span>
              <span>·</span>
              <span>{result.products?.length} products analyzed via Anakin Wire</span>
            </div>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <span>HawkEye AI · Built for Anakin Build-a-thon 2026</span>
        <span style={{ color: "var(--text-muted)" }}>
          Wire API + Claude AI + React
        </span>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    background: "var(--bg-primary)",
  },
  grid: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: "48px 48px",
    pointerEvents: "none",
    zIndex: 0,
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 32px",
    background: "rgba(255, 255, 255, 0.92)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid var(--border)",
    boxShadow: "var(--shadow-sm)",
  },
  navLogo: {
    fontWeight: 800,
    fontSize: 18,
    letterSpacing: "-0.02em",
    color: "var(--text-primary)",
  },
  navRight: {
    display: "flex",
    gap: 10,
  },
  navBadge: {
    fontSize: 11,
    fontFamily: "var(--font-mono)",
    color: "var(--text-secondary)",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "4px 12px",
    letterSpacing: "-0.01em",
  },
  main: {
    flex: 1,
    position: "relative",
    zIndex: 1,
    maxWidth: 1100,
    margin: "0 auto",
    width: "100%",
    padding: "0 24px 60px",
  },
  results: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginTop: 16,
  },
  topGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
  },
  errorBox: {
    background: "var(--red-dim)",
    border: "1px solid var(--red)",
    borderRadius: "var(--radius)",
    padding: "14px 20px",
    color: "var(--red)",
    fontSize: 14,
    fontFamily: "var(--font-mono)",
    maxWidth: 600,
    margin: "0 auto",
    textAlign: "center",
  },
  meta: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
    padding: "16px 0 8px",
    borderTop: "1px solid var(--border)",
  },
  code: {
    color: "var(--accent)",
    background: "var(--accent-dim)",
    borderRadius: 6,
    padding: "2px 8px",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 500,
  },
  footer: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 32px",
    borderTop: "1px solid var(--border)",
    fontSize: 12,
    color: "var(--text-secondary)",
    fontFamily: "var(--font-mono)",
    background: "var(--bg-secondary)",
  },
};