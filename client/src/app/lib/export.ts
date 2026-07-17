import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { Record } from "../config/config"

const EXPORT_HEADERS = ["Date", "Category", "Amount", "Description"]

const toRows = (records: Record[]) =>
  records.map((record) => [
    new Date(record.date).toLocaleDateString(),
    record.category,
    String(record.amount),
    record.description ?? "",
  ])

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = filename
  link.click()

  URL.revokeObjectURL(url)
}

const escapeCsvValue = (value: string) => {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }

  return value
}

export const exportRecordsToCsv = (records: Record[]) => {
  const rows = [EXPORT_HEADERS, ...toRows(records)]
  const csv = rows
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n")

  downloadBlob(
    new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    `records-${Date.now()}.csv`,
  )
}

export const exportRecordsToPdf = (records: Record[]) => {
  const doc = new jsPDF()

  doc.text("Records", 14, 16)

  autoTable(doc, {
    startY: 22,
    head: [EXPORT_HEADERS],
    body: toRows(records),
  })

  doc.save(`records-${Date.now()}.pdf`)
}
