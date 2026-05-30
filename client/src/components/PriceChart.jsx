import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

export default function PriceChart({ products, avgPrice }) {
  const sorted = [...products]
    .filter((p) => p.price > 0)
    .sort((a, b) => a.price - b.price)
    .slice(0, 10);

  const data = sorted.map((p) => ({
    name: p.title.split(" ").slice(0, 3).join(" ") + "...",
    price: p.price,
    asin: p.asin,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={tooltipStyle}>
        <div style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700 }}>
          ${payload[0].value.toLocaleString()}
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 11, marginTop: 4 }}>
          {payload[0].payload.name}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.label}>PRICE DISTRIBUTION</div>
        <div style={styles.avgLine}>
          <span style={styles.avgDot} />
          <span style={styles.avgText}>Avg ${avgPrice?.toLocaleString()}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" hide />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="price" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.price <= avgPrice ? "var(--green)" : entry.price > avgPrice * 1.3 ? "var(--red)" : "var(--accent)"}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={styles.legend}>
        <LegendItem color="var(--green)"  label="Below Average" />
        <LegendItem color="var(--accent)" label="Near Average" />
        <LegendItem color="var(--red)"    label="Above Average" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
      <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{label}</span>
    </div>
  );
}

const tooltipStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border-bright)",
  borderRadius: 8,
  padding: "10px 14px",
};

const styles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "24px",
    animation: "fadeUp 0.6s ease",
  },
  header: {
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
  avgLine: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  avgDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--orange)",
    display: "inline-block",
  },
  avgText: {
    fontSize: 11,
    color: "var(--orange)",
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
  },
  legend: {
    display: "flex",
    gap: 20,
    marginTop: 16,
    justifyContent: "center",
  },
};
