import { createRecord } from "../repositories/record.repository"

export const registerRecord = async (
  userId: string,
  amount: number,
  date: Date,
  description: string,
  category: "EXPENSE" | "INCOME" | "INVESTMENT",
) => {
  const record = await createRecord(userId, amount, category, date, description)

  return record
}
