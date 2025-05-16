

function assignIcon(primary) {
  if (!primary) return '💼';
  primary = primary.toLowerCase();

  if (['rent_and_utilities'].includes(primary)) return '🏠';//Housing
  if (['food_and_drink'].includes(primary)) return '🍽️'; //Dining Out
  if (['transportation', 'travel'].includes(primary)) return '🚗'; //Transportation
  if (['medical'].includes(primary)) return '💊'; //Health
  if (['entertainment'].includes(primary)) return '📀'; //Entertainment
  if (['general_merchandise'].includes(primary)) return '🛍️'; //Shopping
  if (['personal_care'].includes(primary)) return '🏋️'; //Lifestyle
  if (['loan_payments', 'bank_fees'].includes(primary)) return '💸'; //Debt & Fees
  if (['transfer_out', 'transfer_in'].includes(primary)) return '💰'; //Savings
  if (['income'].includes(primary)) return '💵';//Income

  return '💼'; //Other
}


module.exports = {assignIcon};

