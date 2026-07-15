import { Record } from "../config/config"

type Props = {
  record: Record
}

export default function RecordItem({ record }: Props) {
  return (
    <div
      key={record.id}
      className="flex flex-col gap-2 rounded-xl border border-black/8 bg-white p-4 dark:border-white/[.145] dark:bg-black"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {record.category}
        </span>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {new Date(record.date).toLocaleDateString()}
        </span>
      </div>

      <span className="text-xl font-semibold text-black dark:text-zinc-50">
        {record.amount}
      </span>

      {record.description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {record.description}
        </p>
      )}
    </div>
  )
}
