import {
  getBudget,
  getExpenseTotalForMonth,
  upsertBudget,
} from "../repositories/budget.repository"

const ALERT_THRESHOLD = 0.9

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
  const spent = Number(await getExpenseTotalForMonth(userId, month, year))
  const limit = budget ? Number(budget.amount) : null
  const percentage = limit ? spent / limit : 0

  return {
    month,
    year,
    limit,
    spent,
    percentage,
    thresholdReached: limit !== null && percentage >= ALERT_THRESHOLD,
  }
}
