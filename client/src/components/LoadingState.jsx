import React, { useState, useEffect } from "react";

const steps = [
  { icon: "🧠", text: "Extracting product intent with Claude AI..." },
  { icon: "🌐", text: "Submitting Wire job to Amazon..." },
  { icon: "⏳", text: "Polling for live Amazon data..." },
  { icon: "📊", text: "Running market intelligence engine..." },
  { icon: "🤖", text: "Generating AI recommendation..." },
];

export default function LoadingState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.ring}>
        <div style={styles.spinner} />
        <span style={styles.eye}>🦅</span>
      </div>

      <div style={styles.stepsWrap}>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              ...styles.stepRow,
              opacity: i <= step ? 1 : 0.25,
              transform: i === step ? "translateX(4px)" : "none",
            }}
          >
            <span style={styles.stepIcon}>{s.icon}</span>
            <span style={{
              ...styles.stepText,
              color: i === step ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: i === step ? 600 : 400,
            }}>
              {s.text}
            </span>
            {i < step && <span style={styles.check}>✓</span>}
            {i === step && <span style={styles.activeDot} />}
          </div>
        ))}
      </div>

      <p style={styles.note}>This may take 30–45 seconds while Wire scrapes live data</p>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 24px",
    gap: 40,
    animation: "fadeUp 0.4s ease",
  },
  ring: {
    position: "relative",
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "2px solid var(--border)",
    borderTopColor: "var(--accent)",
    animation: "spinRing 1s linear infinite",
  },
  eye: { fontSize: 32 },
  stepsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
    maxWidth: 420,
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    transition: "all 0.4s ease",
  },
  stepIcon: { fontSize: 16, width: 24, textAlign: "center" },
  stepText: {
    flex: 1,
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    transition: "color 0.3s",
  },
  check: {
    color: "var(--green)",
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    fontWeight: 700,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--accent)",
    animation: "pulse 1s infinite",
  },
  note: {
    fontSize: 12,
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
  },
};
