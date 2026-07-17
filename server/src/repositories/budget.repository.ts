import { prisma } from "../lib/prisma"

export const upsertBudget = async (
  userId: string,
  month: number,
  year: number,
  amount: number,
) => {
  return prisma.budget.upsert({
    where: { userId_month_year: { userId, month, year } },
    update: { amount },
    create: { userId, month, year, amount },
  })
}

export const getBudget = async (
  userId: string,
  month: number,
  year: number,
) => {
  return prisma.budget.findUnique({
    where: { userId_month_year: { userId, month, year } },
  })
}

export const getExpenseTotalForMonth = async (
  userId: string,
  month: number,
  year: number,
) => {
  const start = new Date(Date.UTC(year, month - 1, 1))
  const end = new Date(Date.UTC(year, month, 1))

  const result = await prisma.record.aggregate({
    where: {
      userId,
      deleted: false,
      category: "EXPENSE",
      date: { gte: start, lt: end },
    },
    _sum: { amount: true },
  })

  return result._sum.amount ?? 0
}
