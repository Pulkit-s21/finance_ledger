import type { Request, Response } from "express"
import { askDashboardQuestion } from "../services/chat.service"

export const askQuestionController = async (req: Request, res: Response) => {
  const { message } = req.body
  const userId = req.userId!

  if (!message) {
    return res.status(400).json({ message: "message is required" })
  }

  const reply = await askDashboardQuestion(userId, message)

  return res.status(200).json({ reply })
}
