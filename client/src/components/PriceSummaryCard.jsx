import React from "react";

export default function PriceSummaryCard({ marketSummary, product }) {
  const { avg_price, cheapest_price, expensive_price, trend, confidence, total_products } = marketSummary;

  const trendConfig = {
    down:   { label: "Trending Down",   color: "var(--green)",  icon: "📉" },
    up:     { label: "Trending Up",     color: "var(--red)",    icon: "📈" },
    stable: { label: "Stable Market",   color: "var(--orange)", icon: "➡️" },
  };

  const t = trendConfig[trend] || trendConfig.stable;
  const fmt = (n) => n ? `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` : "—";

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <div style={styles.label}>MARKET SUMMARY</div>
          <div style={styles.productName}>{product}</div>
        </div>
        <div style={{ ...styles.trendBadge, color: t.color, borderColor: t.color, background: t.color + "15" }}>
          {t.icon} {t.label}
        </div>
      </div>

      <div style={styles.statsGrid}>
        <StatBox label="Average Price" value={fmt(avg_price)} accent="var(--accent)" />
        <StatBox label="Cheapest" value={fmt(cheapest_price)} accent="var(--green)" />
        <StatBox label="Most Expensive" value={fmt(expensive_price)} accent="var(--red)" />
        <StatBox label="Products Found" value={total_products} accent="var(--orange)" />
      </div>

      <div style={styles.confidenceRow}>
        <span style={styles.confLabel}>Confidence Score</span>
        <div style={styles.confBarWrap}>
          <div style={{ ...styles.confBar, width: `${confidence * 100}%` }} />
        </div>
        <span style={styles.confValue}>{Math.round(confidence * 100)}%</span>
      </div>
    </div>
  );
}

function StatBox({ label, value, accent }) {
  return (
    <div style={styles.statBox}>
      <div style={{ ...styles.statValue, color: accent }}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "24px",
    animation: "fadeUp 0.4s ease",
    boxShadow: "var(--shadow)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12,
  },
  label: {
    fontSize: 10,
    fontFamily: "var(--font-mono)",
    color: "var(--text-muted)",
    letterSpacing: "0.12em",
    marginBottom: 6,
  },
  productName: {
    fontSize: 22,
    fontWeight: 700,
    color: "var(--text-primary)",
    textTransform: "capitalize",
  },
  trendBadge: {
    fontSize: 12,
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    border: "1px solid",
    borderRadius: 6,
    padding: "5px 12px",
    letterSpacing: "0.04em",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "16px",
  },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "var(--font-mono)",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "var(--text-muted)",
    letterSpacing: "0.06em",
  },
  confidenceRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  confLabel: {
    fontSize: 11,
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
    whiteSpace: "nowrap",
  },
  confBarWrap: {
    flex: 1,
    height: 4,
    background: "var(--border)",
    borderRadius: 2,
    overflow: "hidden",
  },
  confBar: {
    height: "100%",
    background: "linear-gradient(90deg, var(--accent), var(--green))",
    borderRadius: 2,
    transition: "width 1s ease",
  },
  confValue: {
    fontSize: 12,
    color: "var(--accent)",
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    minWidth: 36,
  },
};
