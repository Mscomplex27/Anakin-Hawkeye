import React, { useState } from "react";

const TAG_STYLES = {
  "Best Deal":     { bg: "rgba(0,230,118,0.15)", color: "var(--green)" },
  "Below Average": { bg: "rgba(0,230,118,0.1)",  color: "var(--green)" },
  "Overpriced":    { bg: "rgba(255,82,82,0.15)",  color: "var(--red)" },
  "Top Rated":     { bg: "rgba(0,212,255,0.15)",  color: "var(--accent)" },
  "Prime":         { bg: "rgba(0,212,255,0.1)",   color: "var(--accent)" },
  "Sponsored":     { bg: "rgba(255,152,0,0.1)",   color: "var(--orange)" },
};

export default function ProductTable({ products }) {
  const [sortBy, setSortBy] = useState("price");
  const [asc, setAsc] = useState(true);

  const sorted = [...products].sort((a, b) => {
    if (sortBy === "price")  return asc ? a.price - b.price : b.price - a.price;
    if (sortBy === "rating") return asc ? (a.rating || 0) - (b.rating || 0) : (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const toggleSort = (col) => {
    if (sortBy === col) setAsc(!asc);
    else { setSortBy(col); setAsc(true); }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.label}>PRODUCTS ({products.length})</div>
        <div style={styles.sortRow}>
          <SortBtn label="Price" active={sortBy === "price"} asc={asc} onClick={() => toggleSort("price")} />
          <SortBtn label="Rating" active={sortBy === "rating"} asc={asc} onClick={() => toggleSort("rating")} />
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["Product", "Price", "Rating", "Reviews", "Tags", ""].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.asin || i} style={styles.row}>
                <td style={styles.tdProduct}>
                  <div style={styles.productInfo}>
                    {p.image_url && (
                      <img src={p.image_url} alt="" style={styles.thumb}
                        onError={(e) => { e.target.style.display = "none"; }} />
                    )}
                    <div style={styles.productTitle} title={p.title}>
                      {p.title.length > 60 ? p.title.slice(0, 60) + "..." : p.title}
                    </div>
                  </div>
                </td>
                <td style={{ ...styles.td, ...styles.tdPrice }}>
                  ${p.price.toLocaleString()}
                </td>
                <td style={styles.td}>
                  {p.rating ? (
                    <span style={styles.rating}>⭐ {p.rating}</span>
                  ) : "—"}
                </td>
                <td style={styles.td}>
                  <span style={styles.reviews}>
                    {p.review_count ? p.review_count.toLocaleString() : "—"}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.tags}>
                    {(p.tags || []).map((tag) => (
                      <span key={tag} style={{ ...styles.tag, ...(TAG_STYLES[tag] || {}) }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={styles.td}>
                  <a href={p.url} target="_blank" rel="noreferrer" style={styles.viewBtn}>
                    View ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortBtn({ label, active, asc, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: active ? "var(--accent-dim)" : "none",
      border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
      color: active ? "var(--accent)" : "var(--text-muted)",
      borderRadius: 6,
      padding: "4px 10px",
      fontSize: 11,
      fontFamily: "var(--font-mono)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 4,
    }}>
      {label} {active ? (asc ? "↑" : "↓") : ""}
    </button>
  );
}

const styles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "24px",
    animation: "fadeUp 0.7s ease",
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
  sortRow: { display: "flex", gap: 8 },
  tableWrap: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  th: {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: 10,
    fontFamily: "var(--font-mono)",
    color: "var(--text-muted)",
    letterSpacing: "0.1em",
    borderBottom: "1px solid var(--border)",
    whiteSpace: "nowrap",
  },
  row: {
    borderBottom: "1px solid var(--border)",
    transition: "background 0.15s",
  },
  td: {
    padding: "12px",
    color: "var(--text-secondary)",
    verticalAlign: "middle",
  },
  tdProduct: {
    padding: "12px",
    minWidth: 240,
    maxWidth: 340,
    verticalAlign: "middle",
  },
  productInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  thumb: {
    width: 40,
    height: 40,
    objectFit: "contain",
    borderRadius: 6,
    background: "var(--bg-secondary)",
    flexShrink: 0,
  },
  productTitle: {
    color: "var(--text-primary)",
    fontSize: 12,
    lineHeight: 1.5,
  },
  tdPrice: {
    color: "var(--accent)",
    fontFamily: "var(--font-mono)",
    fontWeight: 700,
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  rating: {
    fontFamily: "var(--font-mono)",
    fontSize: 12,
  },
  reviews: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--text-muted)",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
    minWidth: 100,
  },
  tag: {
    fontSize: 10,
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 4,
    background: "var(--bg-secondary)",
    color: "var(--text-muted)",
    whiteSpace: "nowrap",
  },
  viewBtn: {
    color: "var(--accent)",
    fontSize: 11,
    fontFamily: "var(--font-mono)",
    textDecoration: "none",
    opacity: 0.7,
    whiteSpace: "nowrap",
  },
};
