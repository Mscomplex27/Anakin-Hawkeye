const express = require("express");
const router = express.Router();

const { scrapeAmazon } = require("../services/scraperService");
const { normalizeScrapedData } = require("../services/dataNormalizer");
const {
  generateMarketSummary,
  generateRecommendation,
  tagProducts,
} = require("../services/intelligenceEngine");
const {
  extractProductFromQuery,
  generateAIInsight,
} = require("../services/claudeService");

const INSUFFICIENT = (query, product, reason) => ({
  original_query: query,
  product,
  market_summary: {
    avg_price: 0,
    trend: "stable",
    best_platform: "amazon",
    expensive_price: 0,
    cheapest_price: 0,
    confidence: 0,
    total_products: 0,
  },
  recommendation: {
    action: "INSUFFICIENT_DATA",
    reason,
    risk_level: "HIGH",
  },
  ai_insight: null,
  products: [],
});

router.post("/query", async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "query is required" });
  }

  // STEP 1: Claude extracts clean product name
  console.log(`[ANALYZE] Query: "${query}"`);
  const product = await extractProductFromQuery(query);
  console.log(`[ANALYZE] Extracted product: "${product}"`);

  // STEP 2: Wire scrape Amazon
  const wireResponse = await scrapeAmazon(product);

  if (!wireResponse) {
    return res.json(
      INSUFFICIENT(query, product, "Wire API call failed. Check ANAKIN_API_KEY.")
    );
  }

  // STEP 3: Normalize
  const rawProducts = normalizeScrapedData(wireResponse);

  if (!rawProducts.length) {
    return res.json(
      INSUFFICIENT(query, product, "Wire returned results but no priced products found.")
    );
  }

  // STEP 4: Intelligence
  const marketSummary = generateMarketSummary(rawProducts);
  const recommendation = generateRecommendation(marketSummary);
  const taggedProducts = tagProducts(rawProducts, marketSummary);

  // STEP 5: Claude AI insight (non-blocking — runs in parallel with response)
  const aiInsight = await generateAIInsight(product, marketSummary, taggedProducts);

  return res.json({
    original_query: query,
    product,
    market_summary: marketSummary,
    recommendation,
    ai_insight: aiInsight,
    products: taggedProducts,
  });
});

module.exports = router;
