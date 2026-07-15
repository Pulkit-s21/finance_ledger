import { prisma } from "../lib/prisma"

export const createRecord = async (
  userId: string,
  amount: number,
  category: "EXPENSE" | "INCOME" | "INVESTMENT",
  date: Date,
  description: string,
) => {
  return prisma.record.create({
    data: {
      userId,
      amount,
      category,
      date,
      description,
    },
  })
}

export const getRecords = async () => {
  return prisma.record.findMany({
    omit: { updatedAt: true, userId: true },
    orderBy: { createdAt: "desc" },
  })
}
