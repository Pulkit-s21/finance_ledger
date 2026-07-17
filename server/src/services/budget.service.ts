import {
  getBudget,
  getExpenseRecordsForMonth,
  upsertBudget,
} from "../repositories/budget.repository"

const ALERT_THRESHOLD = 0.9
const MIN_DAYS_FOR_PROJECTION = 3

export const setBudget = async (
  userId: string,
  month: number,
  year: number,
  amount: number,
) => {
  return upsertBudget(userId, month, year, amount)
}

export const getBudgetStatus = async (
  userId: string,
  month: number,
  year: number,
) => {
  const budget = await getBudget(userId, month, year)
  const records = await getExpenseRecordsForMonth(userId, month, year)
  const limit = budget ? Number(budget.amount) : null

  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const dailyTotals = Array<number>(daysInMonth).fill(0)

  records.forEach((record) => {
    const day = record.date.getUTCDate()
    dailyTotals[day - 1] += Number(record.amount)
  })

  const spent = dailyTotals.reduce((sum, day) => sum + day, 0)
  const percentage = limit ? spent / limit : 0

  const now = new Date()
  const monthStart = Date.UTC(year, month - 1, 1)
  const currentMonthStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  const daysElapsed =
    monthStart === currentMonthStart
      ? now.getUTCDate()
      : monthStart < currentMonthStart
        ? daysInMonth
        : 0

  const cumulative: Array<number | null> = []
  let running = 0

  for (let day = 1; day <= daysInMonth; day++) {
    if (day <= daysElapsed) {
      running += dailyTotals[day - 1]
      cumulative.push(running)
    } else {
      cumulative.push(null)
    }
  }

  const spentToDate = daysElapsed > 0 ? (cumulative[daysElapsed - 1] ?? 0) : 0
  const projectedTotal =
    limit !== null && daysElapsed >= MIN_DAYS_FOR_PROJECTION
      ? (spentToDate / daysElapsed) * daysInMonth
      : null

  return {
    month,
    year,
    limit,
    spent,
    percentage,
    thresholdReached: limit !== null && percentage >= ALERT_THRESHOLD,
    pace: {
      daysInMonth,
      daysElapsed,
      cumulative,
      projectedTotal,
      onPace:
        projectedTotal !== null && limit !== null
          ? projectedTotal <= limit
          : null,
    },
  }
}
