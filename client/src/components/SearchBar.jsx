import React, { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) onSearch(query.trim());
  };

  const examples = ["macbook", "nike shoes", "samsung galaxy s24", "sony headphones"];

  return (
    <div style={styles.wrapper}>
      <div style={styles.badge}>
        <span style={styles.dot} />
        LIVE MARKET INTELLIGENCE
      </div>

      <h1 style={styles.title}>
        <span style={styles.titleAccent}>HawkEye</span> AI
      </h1>
      <p style={styles.subtitle}>
        Real-time Amazon product intelligence powered by Anakin Wire + Claude AI
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputWrap}>
          <svg style={styles.searchIcon} viewBox="0 0 25 25" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any product — macbook, nike shoes, samsung tv..."
            style={styles.input}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !query.trim()} style={{
            ...styles.btn,
            opacity: loading || !query.trim() ? 0.7 : 1,
            cursor: loading || !query.trim() ? "not-allowed" : "pointer",
          }}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </form>

      <div style={styles.examples}>
        <span style={styles.exampleLabel}>Try:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => { setQuery(ex); if (!loading) onSearch(ex); }}
            style={styles.chip}
            disabled={loading}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: "center",
    padding: "60px 24px 48px",
    maxWidth: "100%",
    margin: "0 auto",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    fontFamily: "var(--font-mono)",
    color: "var(--accent)",
    letterSpacing: "0.12em",
    background: "var(--accent-dim)",
    border: "1px solid rgba(0,212,255,0.2)",
    borderRadius: 20,
    padding: "5px 14px",
    marginBottom: 28,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--accent)",
    display: "inline-block",
    animation: "pulse 1.5s infinite",
  },
  title: {
    fontSize: "clamp(40px, 8vw, 72px)",
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: 16,
    letterSpacing: "-0.03em",
  },
  titleAccent: {
    color: "var(--accent)",
    textShadow: "0 0 40px rgba(0,212,255,0.4)",
  },
  subtitle: {
    fontSize: 16,
    color: "var(--text-secondary)",
    marginBottom: 40,
    lineHeight: 1.6,
  },
  form: { width: "100%" },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    background: "var(--bg-card)",
    border: "1px solid var(--border-bright)",
    borderRadius: "var(--radius-lg)",
    padding: "6px 6px 6px 16px",
    gap: 12,
    transition: "border-color 0.2s",
    boxShadow: "var(--shadow-accent)",
  },
  searchIcon: {
    width: 18,
    height: 18,
    color: "var(--text-muted)",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: "none",
    border: "none",
    outline: "none",
    color: "var(--text-primary)",
    fontFamily: "var(--font-display)",
    fontSize: 15,
    padding: "8px 0",
  },
  btn: {
    background: "var(--accent)",
    color: "#f9f6f6",
    border: "none",
    borderRadius: 10,
    padding: "10px 24px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.02rem",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  examples: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginTop: 20,
    flexWrap: "wrap",
  },
  exampleLabel: {
    fontSize: 12,
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
  },
  chip: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 6,
    padding: "4px 12px",
    fontSize: 12,
    color: "var(--text-secondary)",
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
    transition: "all 0.15s",
  },
};
