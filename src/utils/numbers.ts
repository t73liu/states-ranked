const percentFormat = new Intl.NumberFormat("default", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPercent = (num: number): string => {
  return percentFormat.format(num);
}
