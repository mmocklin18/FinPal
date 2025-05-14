const categoryColors = {
  Housing: "#ff595e",
  Dining_Out: "#ff924c",
  Transportation: "#ffca3a",
  Health: "#c5ca30",
  Entertainment: "#8ac926",
  Shopping: "#36949d",
  Lifestyle: "#1982c4",
  Debt_Fees: "#ff595e",
  Savings: "#2ECC71",
  Income: "#565aa0"
};

function normalizeCategoryKey(category) {
  return category
    .replace(/_?&_?/g, "_")     // replaces "&", "_&", "&_", "_&_"
    .replace(/\s+/g, "_")       // replace spaces with _
    .replace(/[^a-zA-Z0-9_]/g, '') // strip weird characters
    .trim();
}

export default function getCategoryColor(category) {
  const normalized = normalizeCategoryKey(category);
  return categoryColors[normalized] || "#BDC3C7"
}

