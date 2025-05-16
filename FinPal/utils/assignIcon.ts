const categoryColors:Record<string, string> = {
  Housing: "🏠",
  Dining_Out: "🍽️",
  Transportation: "🚗",
  Health: "💊",
  Entertainment: "📀",
  Shopping: "🛍️",
  Lifestyle: "🏋️",
  Debt_Fees: "💸",
  Savings: "💰",
  Income: "💵",
};

function normalizeCategoryKey(category: string): string {
  return category
    .replace(/_?&_?/g, "_")     //replaces "&", "_&", "&_", "_&_"
    .replace(/\s+/g, "_")       //replace spaces with _
    .trim();
}

export default function getCategoryColor(category: string): string {
  const normalized = normalizeCategoryKey(category);
  return categoryColors[normalized] || "💼"
}
