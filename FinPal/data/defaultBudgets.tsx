import getCategoryColor from '../utils/getCategoryColor';
import assignIcon from '../utils/assignIcon';
import { ProgressRing } from '../types/progressring';

type RawCategory = {
  name: string;
  primary: string;
  budget: number;
  spent: number;
};

const baseCategories: RawCategory[] = [
  { name: "Housing", primary: "rent_and_utilities", budget: 1000, spent: 300},
  { name: "Dining_Out", primary: "food_and_drink", budget: 300, spent: 200 },
  { name: "Transportation", primary: "transportation", budget: 200, spent: 100},
  { name: "Health", primary: "medical", budget: 150, spent: 50},
  { name: "Entertainment", primary: "entertainment", budget: 150, spent:100},
  { name: "Shopping", primary: "general_merchandise", budget: 250, spent: 250},
  { name: "Lifestyle", primary: "personal_care", budget: 100, spent: 75},
  { name: "Debt_&_Fees", primary: "loan_payments", budget: 400, spent: 380},
  { name: "Savings", primary: "transfer_out", budget: 500, spent: 400 },
  { name: "Income", primary: "income", budget: 3000, spent: 2800},
];

// Build full ProgressRing objects
export const defaultProgressRings: ProgressRing[] = baseCategories.map((cat) => ({
  category: cat.name,
  label: assignIcon(cat.primary),
  color: getCategoryColor(cat.name),
  spent: cat.spent,
  budget: cat.budget,
  percentage: (cat.spent / cat.budget) * 100, 
}));
