import { categories } from "../config/config"

type Props = {
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryFilter({ setCategory }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="rounded-full border border-black/8 px-4 py-1.5 text-sm font-medium text-black dark:border-white/[.145] dark:text-zinc-50"
        onClick={() => setCategory("all")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="rounded-full border border-black/8 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:border-white/[.145] dark:text-zinc-400"
          onClick={() => setCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
