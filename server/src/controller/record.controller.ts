import type { Request, Response } from "express"
import { getAllRecords, registerRecord } from "../services/record.service"

export const createRecordController = async (req: Request, res: Response) => {
  const { amount, date, description, category } = req.body
  const userId = req.userId!

  const record = await registerRecord(userId, amount, date, description, category)

  return res.status(201).json({ message: "Record created", record })
}

export const getAllRecordsController = async (req: Request, res: Response) => {
  const records = await getAllRecords()

  return res.status(200).json({ message: "All Records", records })
}
