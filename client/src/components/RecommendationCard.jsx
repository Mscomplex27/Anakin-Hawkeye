import React from "react";

const actionConfig = {
  BUY_NOW: {
    color: "var(--green)",
    bg: "var(--green-dim)",
    icon: "🟢",
    label: "BUY NOW",
  },
  WAIT: {
    color: "var(--orange)",
    bg: "var(--orange-dim)",
    icon: "🟡",
    label: "WAIT",
  },
  INSUFFICIENT_DATA: {
    color: "var(--red)",
    bg: "var(--red-dim)",
    icon: "🔴",
    label: "INSUFFICIENT DATA",
  },
};

const riskConfig = {
  LOW:    { color: "var(--green)",  label: "LOW RISK" },
  MEDIUM: { color: "var(--orange)", label: "MEDIUM RISK" },
  HIGH:   { color: "var(--red)",    label: "HIGH RISK" },
};

export default function RecommendationCard({ recommendation, aiInsight }) {
  const { action, reason, risk_level } = recommendation;
  const cfg = actionConfig[action] || actionConfig.INSUFFICIENT_DATA;
  const risk = riskConfig[risk_level] || riskConfig.HIGH;

  return (
    <div style={{ ...styles.card, borderColor: cfg.color + "40" }}>
      <div style={styles.topRow}>
        <div style={styles.label}>AI RECOMMENDATION</div>
        <div style={{ ...styles.riskBadge, color: risk.color, borderColor: risk.color + "40" }}>
          {risk.label}
        </div>
      </div>

      <div style={{ ...styles.actionBadge, background: cfg.bg, color: cfg.color }}>
        <span style={styles.actionIcon}>{cfg.icon}</span>
        <span style={styles.actionLabel}>{cfg.label}</span>
      </div>

      <p style={styles.reason}>{reason}</p>

      {aiInsight && (
        <div style={styles.insightBox}>
          <div style={styles.insightHeader}>
            <span style={styles.insightIcon}>🤖</span>
            <span style={styles.insightTitle}>Claude AI Analysis</span>
          </div>
          <p style={styles.insightText}>{aiInsight}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid",
    borderRadius: "var(--radius-lg)",
    padding: "24px",
    animation: "fadeUp 0.5s ease",
    boxShadow: "var(--shadow)",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    fontFamily: "var(--font-mono)",
    color: "var(--text-muted)",
    letterSpacing: "0.12em",
  },
  riskBadge: {
    fontSize: 10,
    fontFamily: "var(--font-mono)",
    fontWeight: 700,
    letterSpacing: "0.1em",
    border: "1px solid",
    borderRadius: 4,
    padding: "3px 10px",
  },
  actionBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    padding: "14px 20px",
    marginBottom: 16,
    width: "100%",
  },
  actionIcon: { fontSize: 20 },
  actionLabel: {
    fontFamily: "var(--font-mono)",
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: "0.05em",
  },
  reason: {
    color: "var(--text-secondary)",
    fontSize: 14,
    lineHeight: 1.7,
    marginBottom: 0,
  },
  insightBox: {
    marginTop: 20,
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "16px",
  },
  insightHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  insightIcon: { fontSize: 14 },
  insightTitle: {
    fontSize: 11,
    fontFamily: "var(--font-mono)",
    color: "var(--accent)",
    letterSpacing: "0.08em",
    fontWeight: 600,
  },
  insightText: {
    fontSize: 13,
    color: "var(--text-secondary)",
    lineHeight: 1.7,
  },
};
