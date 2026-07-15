import { categories, Record } from "../config/config"
import FormButton from "./FormButton"

type Props = {
  handleSubmit: (e: React.FormEvent<Element>) => Promise<void>
  setRecordData: React.Dispatch<React.SetStateAction<Record>>
}

export default function RecordForm({ handleSubmit, setRecordData }: Props) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="amount"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          className="rounded-md border border-black/8 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-400 dark:border-white/[.145] dark:text-zinc-50"
          onChange={(e) =>
            setRecordData((prev) => ({
              ...prev,
              amount: Number(e.target.value),
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="category"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          className="rounded-md border border-black/8 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-400 dark:border-white/[.145] dark:text-zinc-50"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="date"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="rounded-md border border-black/8 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-400 dark:border-white/[.145] dark:text-zinc-50"
          onChange={(e) =>
            setRecordData((prev) => ({
              ...prev,
              date: new Date(e.target.value),
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          className="rounded-md border border-black/8 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-400 dark:border-white/[.145] dark:text-zinc-50"
          onChange={(e) =>
            setRecordData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      <div className="sm:col-span-2">
        <FormButton text="Add record" />
      </div>
    </form>
  )
}
