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

