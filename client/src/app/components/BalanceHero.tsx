import { formatAmount } from "../lib/format"
import CategoryIcon from "./CategoryIcon"

type Props = {
  balance: number
  income: number
  expense: number
  investment: number
}

const miniStats = (income: number, expense: number, investment: number) =>
  [
    { label: "Income", value: income, category: "INCOME" as const, sign: "+" },
    { label: "Expense", value: expense, category: "EXPENSE" as const, sign: "-" },
    {
      label: "Investment",
      value: investment,
      category: "INVESTMENT" as const,
      sign: "",
    },
  ] as const

export default function BalanceHero({
  balance,
  income,
  expense,
  investment,
}: Props) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-linear-to-br from-accent/15 via-card to-card p-6 shadow-sm sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <CategoryIcon category="BALANCE" className="h-4 w-4" />
        </span>
        <p className="text-sm font-medium text-muted">Total balance</p>
      </div>

      <p
        className={`relative mt-3 text-4xl font-semibold tracking-tight sm:text-5xl ${
          balance >= 0 ? "text-foreground" : "text-danger"
        }`}
      >
        {formatAmount(balance)}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border/70 pt-5">
        {miniStats(income, expense, investment).map((stat) => (
          <div key={stat.label} className="flex items-center gap-2.5">
            <span className="text-muted">
              <CategoryIcon category={stat.category} className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="text-sm font-semibold text-foreground">
                {stat.sign}
                {formatAmount(stat.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
