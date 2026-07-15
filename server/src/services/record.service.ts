import { createRecord, getRecords } from "../repositories/record.repository"

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

export const getAllRecords = async () => {
  const records = await getRecords()

  return records
}
