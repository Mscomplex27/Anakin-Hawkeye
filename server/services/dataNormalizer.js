function normalizeScrapedData(wireResponse) {
  if (!wireResponse) return [];

  const productsRaw =
    wireResponse?.data?.data?.products ||
    wireResponse?.data?.products ||
    [];

  const products = [];

  for (const item of productsRaw) {
    if (typeof item !== "object") continue;

    const price = parsePrice(item.price ?? item.current_price ?? null);
    if (!price || price <= 0) continue;

    products.push({
      title: item.title || item.name || "Amazon Product",
      price,
      currency: item.currency || "USD",
      platform: "amazon",
      source: "wire",
      asin: item.asin || "",
      url: item.url || "",
      image_url: item.image_url || "",
      rating: item.rating ?? null,
      review_count: item.review_count ?? null,
      prime: item.prime || false,
      sponsored: item.sponsored || false,
    });
  }

  console.log(
    `[NORMALIZER] ${products.length} priced products from ${productsRaw.length} raw`
  );
  return products;
}

function parsePrice(raw) {
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const cleaned = raw.replace(/[₹$,\s]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

module.exports = { normalizeScrapedData };
