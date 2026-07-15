import type { Request, Response } from "express"
import { registerRecord } from "../services/record.service"

export const createRecordController = async (req: Request, res: Response) => {
  const { userId, amount, date, description, category } = req.body

  await registerRecord(userId, amount, date, description, category)

  return res.status(201).json({ message: "Record created" })
}
