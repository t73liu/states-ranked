const percentFormat = new Intl.NumberFormat("default", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

export const formatPercent = (num: number): string => {
  return percentFormat.format(num);
};

const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (num: number): string => {
  return currencyFormat.format(num);
};
