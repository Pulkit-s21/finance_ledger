import { useEffect, useRef, useState } from "react"
import { getBudgetStatus, setBudget, type BudgetStatus } from "../lib/budget"
import { useToast } from "../context/ToastContext"
import { formatAmount } from "../lib/format"
import type { Record } from "../config/config"
import { months } from "../config/config"
import BudgetPaceChart from "./BudgetPaceChart"

type Props = {
  records: Record[]
}

const fieldClass =
  "rounded-lg border border-border bg-background px-3.5 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"

export default function BudgetTracker({ records }: Props) {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  const [status, setStatus] = useState<BudgetStatus | null>(null)
  const [limitInput, setLimitInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const seededRef = useRef(false)
  const warnedRef = useRef(false)
  const { showToast } = useToast()

  const applyStatus = (fetched: BudgetStatus) => {
    setStatus(fetched)

    if (!seededRef.current) {
      seededRef.current = true
      setLimitInput(fetched.limit !== null ? String(fetched.limit) : "")
    }

    if (fetched.thresholdReached && !warnedRef.current) {
      warnedRef.current = true
      showToast(
        `You've used ${Math.round(fetched.percentage * 100)}% of your ${months[month - 1]} budget`,
        "warning",
      )
    }
  }

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const { status: fetched } = await getBudgetStatus(month, year)

        applyStatus(fetched)
      } catch (err) {
        console.error(`Error: ${err}`)
      }
    }

    loadStatus()
  }, [records])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    const amount = Number(limitInput)

    if (!amount || amount <= 0 || isSaving) return

    setIsSaving(true)

    try {
      await setBudget(month, year, amount)
      warnedRef.current = false

      const { status: fetched } = await getBudgetStatus(month, year)

      applyStatus(fetched)
      showToast("Budget limit saved", "success")
    } catch {
      showToast("Failed to save budget limit. Please try again.", "error")
    } finally {
      setIsSaving(false)
    }
  }

  const percentage = status?.percentage ?? 0
  const hasLimit = status?.limit !== null && status?.limit !== undefined
  const barColor =
    percentage >= 1 ? "bg-danger" : percentage >= 0.9 ? "bg-amber-500" : "bg-accent"

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
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
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 10h18" />
              <path d="M7 15h4" />
            </svg>
          </span>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {months[month - 1]} budget
            </h2>
            {hasLimit && (
              <p className="mt-0.5 text-sm text-muted">
                Spent {formatAmount(status!.spent)} of{" "}
                {formatAmount(status!.limit!)} ({Math.round(percentage * 100)}
                %)
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Set limit"
            value={limitInput}
            onChange={(e) => setLimitInput(e.target.value)}
            className={`${fieldClass} w-32`}
          />
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>

      {hasLimit && (
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-background">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${Math.min(percentage * 100, 100)}%` }}
          />
        </div>
      )}

      {hasLimit && status && (
        <div className="mt-5 border-t border-border pt-5">
          <BudgetPaceChart pace={status.pace} limit={status.limit!} />

          <p className="mt-2 text-sm text-muted">
            {status.pace.projectedTotal === null ? (
              "A few more days of spending will unlock a month-end projection."
            ) : status.pace.onPace ? (
              <>
                On pace to land at{" "}
                <span className="font-medium text-foreground">
                  {formatAmount(status.pace.projectedTotal)}
                </span>{" "}
                — under your {formatAmount(status.limit!)} limit.
              </>
            ) : (
              <>
                On pace to reach{" "}
                <span className="font-medium text-danger">
                  {formatAmount(status.pace.projectedTotal)}
                </span>{" "}
                — {formatAmount(status.pace.projectedTotal - status.limit!)}{" "}
                over your limit.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
