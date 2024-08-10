export const calcPayment = (
  entries: number,
  normalbaskets: number,
  redBaskets: number,
  discount: null | number | 'free' | 'other' | 'group'
): number => {
  const totalBaskets = normalbaskets + redBaskets;
  if (discount === 'free') return 0;
  if (discount === 'group') {
    const basketCost =
      totalBaskets <= entries
        ? normalbaskets * 0
        : entries * 0 + (normalbaskets - entries) * 20;
    const payment = entries * 30 + basketCost;
    return payment;
  }
  const basketCost =
    // totalBaskets <= entries ?
    normalbaskets * 10 + redBaskets * 20;
  // : normalbaskets * 10 + redBaskets * 20 + (totalBaskets - entries) * 10;
  const payment = entries * 35 + basketCost;
  // if (!discount) return payment
  if (typeof discount === 'number') return payment - discount;
  if (discount === 'other') return payment;
  return payment;
};
