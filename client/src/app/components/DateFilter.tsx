import { months } from "../config/config"

type Props = {
  month: number | "all"
  setMonth: React.Dispatch<React.SetStateAction<number | "all">>
  year: number | "all"
  setYear: React.Dispatch<React.SetStateAction<number | "all">>
  years: number[]
}

const fieldClass =
  "rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"

export default function DateFilter({
  month,
  setMonth,
  year,
  setYear,
  years,
}: Props) {
  return (
    <div className="flex gap-2">
      <select
        aria-label="Filter by month"
        value={month}
        className={fieldClass}
        onChange={(e) =>
          setMonth(e.target.value === "all" ? "all" : Number(e.target.value))
        }
      >
        <option value="all">All months</option>
        {months.map((name, index) => (
          <option key={name} value={index}>
            {name}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by year"
        value={year}
        className={fieldClass}
        onChange={(e) =>
          setYear(e.target.value === "all" ? "all" : Number(e.target.value))
        }
      >
        <option value="all">All years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}
