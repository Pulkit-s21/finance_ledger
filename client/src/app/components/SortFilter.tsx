import { sortOptions, type SortOption } from "../config/config"

type Props = {
  sortOption: SortOption
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>
}

const fieldClass =
  "rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"

export default function SortFilter({ sortOption, setSortOption }: Props) {
  return (
    <select
      aria-label="Sort records"
      value={sortOption}
      className={fieldClass}
      onChange={(e) => setSortOption(e.target.value as SortOption)}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
