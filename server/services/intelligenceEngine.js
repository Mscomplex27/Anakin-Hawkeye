function generateMarketSummary(products) {
  if (!products || products.length === 0) {
    return {
      avg_price: 0,
      trend: "stable",
      best_platform: "amazon",
      expensive_price: 0,
      cheapest_price: 0,
      confidence: 0,
      total_products: 0,
    };
  }

  const prices = products.map((p) => p.price).filter((p) => p > 0);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  const cheapest = Math.min(...prices);
  const expensive = Math.max(...prices);

  // Trend: if cheapest is significantly below avg, market is trending down
  const spreadRatio = (expensive - cheapest) / avg;
  let trend = "stable";
  if (cheapest < avg * 0.75) trend = "down";
  else if (expensive > avg * 1.5) trend = "up";

  const confidence = Math.min(0.95, 0.5 + products.length * 0.03);

  return {
    avg_price: Math.round(avg * 100) / 100,
    trend,
    best_platform: "amazon",
    expensive_price: expensive,
    cheapest_price: cheapest,
    confidence: Math.round(confidence * 100) / 100,
    total_products: products.length,
  };
}

function generateRecommendation(marketSummary) {
  const { avg_price, cheapest_price, trend, confidence } = marketSummary;

  if (confidence === 0 || avg_price === 0) {
    return {
      action: "INSUFFICIENT_DATA",
      reason: "Not enough product data to make a recommendation.",
      risk_level: "HIGH",
    };
  }

  const dealRatio = cheapest_price / avg_price;

  if (trend === "down" && dealRatio < 0.8) {
    return {
      action: "BUY_NOW",
      reason: "Prices are trending down and a strong deal exists below market average.",
      risk_level: "LOW",
    };
  }

  if (trend === "up" || dealRatio > 0.95) {
    return {
      action: "WAIT",
      reason: "Prices are at or above market average. Better deals may appear soon.",
      risk_level: "MEDIUM",
    };
  }

  return {
    action: "BUY_NOW",
    reason: "Downward price trend detected with fair market pricing.",
    risk_level: "LOW",
  };
}

function tagProducts(products, marketSummary) {
  const { avg_price, cheapest_price } = marketSummary;

  return products.map((p) => {
    const tags = [];

    if (p.price === cheapest_price) tags.push("Best Deal");
    if (p.price < avg_price * 0.8) tags.push("Below Average");
    if (p.price > avg_price * 1.3) tags.push("Overpriced");
    if (p.rating >= 4.5 && p.review_count > 100) tags.push("Top Rated");
    if (p.prime) tags.push("Prime");
    if (p.sponsored) tags.push("Sponsored");

    return { ...p, tags };
  });
}

module.exports = { generateMarketSummary, generateRecommendation, tagProducts };
