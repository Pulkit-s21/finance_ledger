import { useState } from "react"
import { categoryStyles, Record } from "../config/config"
import { deleteRecord, updateRecord } from "../lib/record"
import RecordForm from "./RecordForm"

type Props = {
  record: Record
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
}

export default function RecordItem({ record, setRecords }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [recordData, setRecordData] = useState<Record>(record)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleDelete = async () => {
    const res = await deleteRecord(record.id)

    console.log(res)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isUpdating) return

    setIsUpdating(true)

    try {
      const { record: updated } = await updateRecord(recordData)

      setRecords((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r)),
      )
      setIsEditing(false)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <RecordForm
          recordData={recordData}
          handleSubmit={handleUpdate}
          setRecordData={setRecordData}
          btnText="Save"
          loading={isUpdating}
        />

        <button
          type="button"
          className="self-start text-sm font-medium text-muted transition-colors hover:text-foreground"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    )
  }

  const style = categoryStyles[record.category]

  return (
    <div
      key={record.id}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}
        >
          {record.category}
        </span>
        <span className="text-xs text-muted">
          {new Date(record.date).toLocaleDateString()}
        </span>
      </div>

      <span className={`text-2xl font-semibold ${style.amount}`}>
        {style.sign}
        {record.amount}
      </span>

      {record.description && (
        <p className="text-sm text-muted">{record.description}</p>
      )}

      <div className="mt-1 flex gap-2 border-t border-border pt-3">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          onClick={() => setIsEditing(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Edit
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-muted transition-colors hover:bg-danger/10 hover:text-danger"
          onClick={() => handleDelete()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}
