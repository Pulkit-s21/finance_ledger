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

export const getRecords = async (userId: string) => {
  return prisma.record.findMany({
    where: { deleted: false, userId },
    omit: { updatedAt: true, userId: true },
    orderBy: { createdAt: "desc" },
  })
}

export const getRecordsByUser = async (userId: string) => {
  return prisma.record.findMany({
    where: { deleted: false, userId },
    omit: { updatedAt: true, userId: true },
    orderBy: { createdAt: "desc" },
  })
}

export const deleteRecord = async (id: string) => {
  return prisma.record.update({ where: { id }, data: { deleted: true } })
}

export const updateRecord = async (
  id: string,
  amount: number,
  category: "EXPENSE" | "INCOME" | "INVESTMENT",
  date: Date,
  description: string,
) => {
  return prisma.record.update({
    where: { id },
    data: { amount, category, date, description },
  })
}
