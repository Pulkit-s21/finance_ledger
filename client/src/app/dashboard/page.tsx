"use client"

import { useEffect, useState } from "react"
import { getRecords } from "../lib/record"
import type { Record } from "../config/config"
import RecordsGrid from "../components/RecordsGrid"
import AddRecordForm from "../components/AddRecordForm"
import CategoryFilter from "../components/CategoryFilter"

export default function Dashboard() {
  const [records, setRecords] = useState<Record[]>([])
  const [category, setCategory] = useState("all")

  const filteredRecords =
    category === "all"
      ? records
      : records.filter((record) => record.category === category)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await getRecords()

        setRecords(res.records)
      } catch (err) {
        console.error(`Error: ${err}`)
      }
    }

    fetchRecords()
  }, [])

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
          Dashboard
        </h1>

        <div className="mb-8">
          <AddRecordForm setRecords={setRecords} />
        </div>

        <div className="mb-6">
          <CategoryFilter setCategory={setCategory} />
        </div>

        <RecordsGrid records={filteredRecords} />
      </div>
    </div>
  )
}
