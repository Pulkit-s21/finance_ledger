import { useMemo } from "react"
import { Doughnut } from "react-chartjs-2"
import type { Category, Record as LedgerRecord } from "../config/config"

type Props = {
  filteredRecords: LedgerRecord[]
}

export default function Chart({ filteredRecords }: Props) {
  const chartData = useMemo(() => {
    const totals: Partial<Record<Category, number>> = {}

    filteredRecords.forEach((record) => {
      totals[record.category] =
        (totals[record.category] ?? 0) + Number(record.amount)
    })

    return {
      labels: Object.keys(totals),
      datasets: [
        {
          label: "Amount",
          data: Object.values(totals),
          backgroundColor: [
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#06b6d4",
          ],
          borderWidth: 1,
        },
      ],
    }
  }, [filteredRecords])

  return (
    <div className="mx-auto h-72 w-72">
      <Doughnut data={chartData} />
    </div>
  )
}
