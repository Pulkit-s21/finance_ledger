import { useState } from "react"
import { Record } from "../config/config"
import { registerRecord } from "../lib/record"
import RecordForm from "./RecordForm"

type Props = {
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
}

export default function AddRecordForm({ setRecords }: Props) {
  const [recordData, setRecordData] = useState<Record>({
    id: "",
    amount: 0,
    category: "EXPENSE",
    date: new Date(),
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { amount, category, date, description } = recordData

    if (!amount || !category || !date || !description) return

    const { record } = await registerRecord(recordData)

    setRecords((prev) => [record, ...prev])
  }

  return (
    <div className="w-full rounded-xl border border-black/8 bg-white p-6 dark:border-white/[.145] dark:bg-black">
      <h2 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
        Add record
      </h2>

      <RecordForm handleSubmit={handleSubmit} setRecordData={setRecordData} />
    </div>
  )
}
