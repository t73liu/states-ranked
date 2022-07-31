const percentFormat = new Intl.NumberFormat("default", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

export const formatPercent = (num: number): string => {
  return percentFormat.format(num);
}
