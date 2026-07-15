import { categories, Category, Record } from "../config/config"
import FormButton from "./FormButton"

type Props = {
  recordData: Record
  handleSubmit: (e: React.FormEvent<Element>) => Promise<void>
  setRecordData: React.Dispatch<React.SetStateAction<Record>>
  btnText?: string
  loading?: boolean
}

const fieldClass =
  "rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
const labelClass = "text-sm font-medium text-foreground"

export default function RecordForm({
  recordData,
  handleSubmit,
  setRecordData,
  btnText = "Add record",
  loading = false,
}: Props) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="amount" className={labelClass}>
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={recordData.amount}
          className={fieldClass}
          onChange={(e) =>
            setRecordData((prev) => ({
              ...prev,
              amount: Number(e.target.value),
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <select
          id="category"
          name="category"
          value={recordData.category}
          className={fieldClass}
          onChange={(e) =>
            setRecordData((prev) => ({
              ...prev,
              category: e.target.value as Category,
            }))
          }
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="date" className={labelClass}>
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={new Date(recordData.date).toISOString().slice(0, 10)}
          className={fieldClass}
          onChange={(e) =>
            setRecordData((prev) => ({
              ...prev,
              date: new Date(e.target.value),
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={recordData.description ?? ""}
          className={fieldClass}
          onChange={(e) =>
            setRecordData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      <div className="sm:col-span-2">
        <FormButton text={btnText} loading={loading} />
      </div>
    </form>
  )
}
