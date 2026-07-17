"use client"

import { useEffect, useState } from "react"
import { getRecords } from "../lib/record"
import { useRouter } from "next/navigation"
import type { Record, SortOption } from "../config/config"
import RecordsGrid from "../components/RecordsGrid"
import AddRecordForm from "../components/AddRecordForm"
import CategoryFilter from "../components/CategoryFilter"
import SortFilter from "../components/SortFilter"
import DateFilter from "../components/DateFilter"
import Spinner from "../components/Spinner"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import Logout from "../components/Logout"
import Chart from "../components/Chart"
import BudgetTracker from "../components/BudgetTracker"
import ExportButtons from "../components/ExportButtons"
import BalanceHero from "../components/BalanceHero"
import StatCard from "../components/StatCard"
import CategoryIcon from "../components/CategoryIcon"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard() {
  const router = useRouter()
  const [records, setRecords] = useState<Record[]>([])
  const [category, setCategory] = useState("all")
  const [sortOption, setSortOption] = useState<SortOption>("date-desc")
  const [month, setMonth] = useState<number | "all">("all")
  const [year, setYear] = useState<number | "all">("all")
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

  const years = Array.from(
    new Set(records.map((record) => new Date(record.date).getFullYear())),
  ).sort((a, b) => b - a)

  const filteredRecords = records
    .filter((record) => !record.deleted)
    .filter((record) => category === "all" || record.category === category)
    .filter(
      (record) => month === "all" || new Date(record.date).getMonth() === month,
    )
    .filter(
      (record) =>
        year === "all" || new Date(record.date).getFullYear() === year,
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "amount-asc":
          return Number(a.amount) - Number(b.amount)
        case "amount-desc":
          return Number(b.amount) - Number(a.amount)
        default:
          return 0
      }
    })

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
    <div
      className="flex flex-1 flex-col bg-background px-4 py-12"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% -10%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 40%)",
      }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-accent to-accent-hover text-accent-foreground shadow-sm">
              <CategoryIcon category="BALANCE" className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Dashboard
              </h1>
              <p className="mt-0.5 text-sm text-muted">
                Track your income, expenses, and investments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleToggleChart()}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
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

        <BalanceHero
          balance={balance}
          income={totals.INCOME}
          expense={totals.EXPENSE}
          investment={totals.INVESTMENT}
        />

        <BudgetTracker records={records} />

        {showChart && (
          <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
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

        <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Your records
              </h2>
              <p className="mt-0.5 text-xs text-muted">
                Showing {filteredRecords.length} of{" "}
                {records.filter((r) => !r.deleted).length}
              </p>
            </div>

            <ExportButtons records={filteredRecords} />
          </div>

          <div className="my-5 border-t border-border" />

          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                Category
              </p>
              <CategoryFilter category={category} setCategory={setCategory} />
            </div>

            <div className="flex flex-wrap gap-6">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                  Period
                </p>
                <DateFilter
                  month={month}
                  setMonth={setMonth}
                  year={year}
                  setYear={setYear}
                  years={years}
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                  Sort by
                </p>
                <SortFilter
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Income" category="INCOME" value={totals.INCOME} />
          <StatCard label="Expense" category="EXPENSE" value={totals.EXPENSE} />
          <StatCard
            label="Investment"
            category="INVESTMENT"
            value={totals.INVESTMENT}
          />
          <StatCard
            label="Biggest expense"
            category="EXPENSE"
            value={biggerExpense?.amount}
            sublabel={biggerExpense?.description ?? undefined}
          />
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
