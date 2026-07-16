"use client"

import { useEffect, useState } from "react"
import { getRecords } from "../lib/record"
import { useRouter } from "next/navigation"
import { categoryStyles, type Record } from "../config/config"
import RecordsGrid from "../components/RecordsGrid"
import AddRecordForm from "../components/AddRecordForm"
import CategoryFilter from "../components/CategoryFilter"
import Spinner from "../components/Spinner"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import Logout from "../components/Logout"
import Chart from "../components/Chart"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard() {
  const router = useRouter()
  const [records, setRecords] = useState<Record[]>([])
  const [category, setCategory] = useState("all")
  const [isLoadingRecords, setIsLoadingRecords] = useState(true)
  const [showChart, setShowChart] = useState(false)
  const [isChartLoading, setIsChartLoading] = useState(false)

  const totals = records
    .filter((record) => !record.deleted)
    .reduce(
      (acc, record) => {
        acc[record.category] += Number(record.amount)

        return acc
      },
      { INCOME: 0, EXPENSE: 0, INVESTMENT: 0 },
    )

  const balance = totals.INCOME - totals.EXPENSE - totals.INVESTMENT

  const biggerExpense = records
    .filter((record) => !record.deleted && record.category === "EXPENSE")
    .reduce<Record | null>((max, record) => {
      if (!max || Number(record.amount) > Number(max.amount)) {
        return record
      }

      return max
    }, null)

  console.log(biggerExpense)

  const filteredRecords =
    category === "all"
      ? records.filter((record) => record.deleted === false)
      : records.filter(
          (record) => record.category === category && record.deleted === false,
        )

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/")
    }
  }, [])

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await getRecords()

        setRecords(res.records)
      } catch (err) {
        console.error(`Error: ${err}`)
      } finally {
        setIsLoadingRecords(false)
      }
    }

    fetchRecords()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  const handleToggleChart = () => {
    setShowChart((prev) => {
      const next = !prev

      if (next) {
        setIsChartLoading(true)
        setTimeout(() => setIsChartLoading(false), 500)
      }

      return next
    })
  }

  return (
    <div className="flex flex-1 flex-col bg-background px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted">
              Track your income, expenses, and investments
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleToggleChart()}
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
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
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v9l6.36 6.36" />
              </svg>
              {showChart ? "Hide chart" : "Show chart"}
            </button>

            <Logout handleLogout={handleLogout} />
          </div>
        </div>

        {showChart && (
          <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
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
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v9l6.36 6.36" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Spending overview
              </h2>
            </div>

            {isLoadingRecords || isChartLoading ? (
              <div className="flex items-center justify-center gap-2 py-16 text-muted">
                <Spinner className="h-5 w-5" />
                <span className="text-sm">Loading chart...</span>
              </div>
            ) : (
              <Chart filteredRecords={filteredRecords} />
            )}
          </div>
        )}

        <div className="mb-8">
          <AddRecordForm setRecords={setRecords} />
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-muted">Your records</h2>
          <CategoryFilter category={category} setCategory={setCategory} />
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(
            [
              {
                label: "Income",
                value: totals.INCOME,
                style: categoryStyles.INCOME,
              },
              {
                label: "Expense",
                value: totals.EXPENSE,
                style: categoryStyles.EXPENSE,
              },
              {
                label: "Investment",
                value: totals.INVESTMENT,
                style: categoryStyles.INVESTMENT,
              },
              {
                label: "Biggest Expense",
                value: biggerExpense?.amount,
                style: categoryStyles.EXPENSE,
              },
            ] as const
          ).map((tile) => (
            <div
              key={tile.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${tile.style.dot}`} />
                <p className="text-sm text-muted">{tile.label}</p>
              </div>
              <p className={`mt-2 text-2xl font-semibold ${tile.style.amount}`}>
                {tile.style.sign}
                {tile.value}
              </p>
            </div>
          ))}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <p className="text-sm text-muted">Balance</p>
            </div>
            <p
              className={`mt-2 text-2xl font-semibold ${balance >= 0 ? "text-accent" : "text-danger"}`}
            >
              {balance}
            </p>
          </div>
        </div>

        {isLoadingRecords ? (
          <div className="flex items-center justify-center gap-2 py-16 text-muted">
            <Spinner className="h-5 w-5" />
            <span className="text-sm">Loading records...</span>
          </div>
        ) : (
          <RecordsGrid records={filteredRecords} setRecords={setRecords} />
        )}
      </div>
    </div>
  )
}
