# 🦅 HawkEye AI — Competitor Intelligence Platform

> Real-time product price intelligence powered by **Anakin Wire** + **Claude AI**

Built for the **Anakin Build-a-thon 2026**

---

## What It Does

Takes a query like `"macbook"` or `"nike shoes"` and returns:
- Live Amazon product data via **Anakin Wire**
- Market price summary (avg, cheapest, most expensive, trend)
- Claude AI-powered recommendation (BUY NOW / WAIT)
- Smart product tags (Best Deal, Overpriced, Top Rated...)
- Price distribution chart

---

## Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Backend   | Node.js + Express           |
| Scraping  | Anakin Wire (`am_search_products`) |
| AI        | Claude API (Anthropic)      |
| Frontend  | React + Recharts            |
| Styling   | Pure CSS (no UI library)    |

---

## Setup

### 1. Clone & install

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 2. Configure environment

```bash
cd server
cp .env.example .env
# Edit .env and add your keys:
# ANAKIN_API_KEY=your_anakin_key
# ANTHROPIC_API_KEY=your_anthropic_key
```

### 3. Run

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Open: http://localhost:3000

---

## API

```
POST /analyze/query
{ "query": "macbook" }
```

Response:
```json
{
  "original_query": "macbook",
  "product": "macbook",
  "market_summary": { "avg_price": 1098, "trend": "down", ... },
  "recommendation": { "action": "BUY_NOW", "reason": "...", "risk_level": "LOW" },
  "ai_insight": "Claude AI analysis...",
  "products": [...]
}
```
