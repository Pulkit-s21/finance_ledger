const formatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
})

export const formatAmount = (amount: number | string | undefined) => {
  if (amount === undefined) return "—"

  return formatter.format(Number(amount))
}
