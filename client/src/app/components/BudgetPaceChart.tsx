import { useMemo } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type TooltipItem,
} from "chart.js"
import type { BudgetPace } from "../lib/budget"
import { formatAmount } from "../lib/format"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
)

type Props = {
  pace: BudgetPace
  limit: number
}

export default function BudgetPaceChart({ pace, limit }: Props) {
  const { daysInMonth, daysElapsed, cumulative, projectedTotal, onPace } = pace

  const chartData = useMemo(() => {
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const paceLine = labels.map((day) => (limit / daysInMonth) * day)

    const projected = Array<number | null>(daysInMonth).fill(null)

    if (projectedTotal !== null && daysElapsed > 0) {
      projected[daysElapsed - 1] = cumulative[daysElapsed - 1]
      projected[daysInMonth - 1] = projectedTotal
    }

    return {
      labels,
      datasets: [
        {
          label: "Spent so far",
          data: cumulative,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.12)",
          fill: true,
          tension: 0.25,
          pointRadius: 0,
          borderWidth: 2,
          spanGaps: false,
        },
        {
          label: "Even pace to limit",
          data: paceLine,
          borderColor: "#94a3b8",
          borderDash: [6, 6],
          pointRadius: 0,
          borderWidth: 1.5,
          fill: false,
        },
        {
          label: "Projected total",
          data: projected,
          borderColor: onPace === false ? "#dc2626" : "#f59e0b",
          borderDash: [2, 3],
          pointRadius: 3,
          borderWidth: 2,
          fill: false,
          spanGaps: true,
        },
      ],
    }
  }, [daysInMonth, daysElapsed, cumulative, projectedTotal, limit, onPace])

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 10, font: { size: 11 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"line">) =>
            ctx.parsed.y === null
              ? ""
              : `${ctx.dataset.label}: ${formatAmount(ctx.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Day of month", font: { size: 11 } },
        grid: { display: false },
      },
      y: { beginAtZero: true },
    },
  }

  return (
    <div className="h-56 w-full">
      <Line data={chartData} options={options} />
    </div>
  )
}
