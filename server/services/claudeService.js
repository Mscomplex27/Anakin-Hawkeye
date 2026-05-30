const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function extractProductFromQuery(query) {
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Extract only the core product name from this search query. Remove noise words like "buy", "cheap", "best", "under", "amazon", "flipkart", platform names, and price ranges.

Query: "${query}"

Reply with ONLY the clean product name, nothing else. Examples:
- "buy nike shoes under 5000 on amazon" → "nike shoes"
- "best macbook from apple 2024" → "macbook"
- "cheap samsung tv 55 inch" → "samsung tv 55 inch"`,
        },
      ],
    });

    return response.content[0].text.trim();
  } catch (err) {
    console.error("[CLAUDE] Query extraction failed:", err.message);
    // Fallback: simple regex clean
    return query
      .replace(/\b(buy|cheap|best|under|above|amazon|flipkart|myntra|price|discount)\b/gi, "")
      .replace(/\d{4,}/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
}

async function generateAIInsight(product, marketSummary, products) {
  try {
    const topProducts = products.slice(0, 5).map((p) => ({
      title: p.title,
      price: p.price,
      rating: p.rating,
    }));

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a market intelligence analyst. Analyze this product market data and give a 2-sentence insight.

Product: ${product}
Average Price: $${marketSummary.avg_price}
Cheapest: $${marketSummary.cheapest_price}
Most Expensive: $${marketSummary.expensive_price}
Trend: ${marketSummary.trend}
Confidence: ${marketSummary.confidence * 100}%
Top Products: ${JSON.stringify(topProducts)}

Give exactly 2 sentences:
1. Current market situation
2. What the buyer should do

Be specific, data-driven, and concise. No fluff.`,
        },
      ],
    });

    return response.content[0].text.trim();
  } catch (err) {
    console.error("[CLAUDE] Insight generation failed:", err.message);
    return null;
  }
}

module.exports = { extractProductFromQuery, generateAIInsight };
