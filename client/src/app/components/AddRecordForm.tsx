import { useState } from "react"
import { categories, Record } from "../config/config"
import { registerRecord } from "../lib/record"
import { useToast } from "../context/ToastContext"
import RecordForm from "./RecordForm"

type Props = {
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
}

export default function AddRecordForm({ setRecords }: Props) {
  const [recordData, setRecordData] = useState<Record>({
    id: "",
    amount: 0,
    category: categories[0],
    date: new Date(),
    description: "",
    deleted: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { amount, category, date, description } = recordData

    if (!amount || !category || !date || !description) return
    if (isLoading) return

    setIsLoading(true)

    try {
      const { record } = await registerRecord(recordData)

      setRecords((prev) => [record, ...prev])
      showToast(`${category} of ${amount} added`, "success")
    } catch {
      showToast("Failed to add record. Please try again.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Add record</h2>
      </div>

      <RecordForm
        recordData={recordData}
        handleSubmit={handleSubmit}
        setRecordData={setRecordData}
        loading={isLoading}
      />
    </div>
  )
}
