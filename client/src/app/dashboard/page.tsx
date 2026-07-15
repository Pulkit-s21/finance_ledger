"use client"

import { useEffect, useState } from "react"
import { getRecords } from "../lib/record"
import type { Record } from "../config/config"
import RecordsGrid from "../components/RecordsGrid"
import AddRecordForm from "../components/AddRecordForm"
import CategoryFilter from "../components/CategoryFilter"
import Spinner from "../components/Spinner"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [records, setRecords] = useState<Record[]>([])
  const [category, setCategory] = useState("all")
  const [isLoadingRecords, setIsLoadingRecords] = useState(true)

  const filteredRecords =
    category === "all"
      ? records.filter((record) => record.deleted === false)
      : records.filter(
          (record) => record.category === category && record.deleted === false,
        )

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

  const handleLogut = () => {
    localStorage.removeItem("token")
    router.push("/")
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

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-danger/40 hover:text-danger"
            onClick={() => handleLogut()}
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            Logout
          </button>
        </div>

        <div className="mb-8">
          <AddRecordForm setRecords={setRecords} />
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-muted">Your records</h2>
          <CategoryFilter category={category} setCategory={setCategory} />
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
