import api from "./axios"

export type BudgetPace = {
  daysInMonth: number
  daysElapsed: number
  cumulative: (number | null)[]
  projectedTotal: number | null
  onPace: boolean | null
}

export type BudgetStatus = {
  month: number
  year: number
  limit: number | null
  spent: number
  percentage: number
  thresholdReached: boolean
  pace: BudgetPace
}

export const setBudget = async (month: number, year: number, amount: number) => {
  const res = await api.post("/budget/set", { month, year, amount })

  return res.data
}

export const getBudgetStatus = async (month: number, year: number) => {
  const res = await api.get<{ message: string; status: BudgetStatus }>(
    "/budget/status",
    { params: { month, year } },
  )

  return res.data
}
