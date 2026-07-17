import {
  createRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from "../repositories/record.repository"

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

export const getAllRecords = async (userId: string) => {
  const records = await getRecords(userId)

  return records
}

export const eraseRecord = async (id: string) => {
  const res = await deleteRecord(id)

  return res
}

export const editRecord = async (
  id: string,
  amount: number,
  date: Date,
  description: string,
  category: "EXPENSE" | "INCOME" | "INVESTMENT",
) => {
  const record = await updateRecord(id, amount, category, date, description)

  return record
}
