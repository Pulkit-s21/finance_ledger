import type { Category } from "../config/config"
import { categoryStyles } from "../config/config"
import { formatAmount } from "../lib/format"
import CategoryIcon from "./CategoryIcon"

type Props = {
  label: string
  category: Category
  value: number | string | undefined
  sublabel?: string
}

export default function StatCard({ label, category, value, sublabel }: Props) {
  const style = categoryStyles[category]

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.badge}`}
        >
          <CategoryIcon category={category} className="h-4 w-4" />
        </span>
        <p className="text-sm font-medium text-muted">{label}</p>
      </div>

      <p className={`mt-3 text-2xl font-semibold tracking-tight ${style.amount}`}>
        {style.sign}
        {formatAmount(value)}
      </p>

      {sublabel && <p className="mt-1 text-xs text-muted">{sublabel}</p>}
    </div>
  )
}
