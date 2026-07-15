import { categories, categoryStyles } from "../config/config"

type Props = {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryFilter({ category, setCategory }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
          category === "all"
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border text-muted hover:border-accent/40"
        }`}
        onClick={() => setCategory("all")}
      >
        All
      </button>

      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            category === c
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-muted hover:border-accent/40"
          }`}
          onClick={() => setCategory(c)}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${category === c ? "bg-accent-foreground" : categoryStyles[c].dot}`}
          />
          {c}
        </button>
      ))}
    </div>
  )
}
