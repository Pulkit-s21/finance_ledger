import type { Record } from "../config/config"
import { exportRecordsToCsv, exportRecordsToPdf } from "../lib/export"
import { useToast } from "../context/ToastContext"

type Props = {
  records: Record[]
}

const buttonClass =
  "rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"

export default function ExportButtons({ records }: Props) {
  const { showToast } = useToast()

  const handleExport = (format: "csv" | "pdf") => {
    if (records.length === 0) {
      showToast("No records to export", "error")
      return
    }

    if (format === "csv") {
      exportRecordsToCsv(records)
    } else {
      exportRecordsToPdf(records)
    }

    showToast(`Exported ${records.length} record(s) as ${format.toUpperCase()}`, "success")
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className={buttonClass}
        disabled={records.length === 0}
        onClick={() => handleExport("csv")}
      >
        Export CSV
      </button>

      <button
        type="button"
        className={buttonClass}
        disabled={records.length === 0}
        onClick={() => handleExport("pdf")}
      >
        Export PDF
      </button>
    </div>
  )
}
