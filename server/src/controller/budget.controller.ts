import type { Request, Response } from "express"
import { getBudgetStatus, setBudget } from "../services/budget.service"

export const setBudgetController = async (req: Request, res: Response) => {
  const { month, year, amount } = req.body
  const userId = req.userId!

  const budget = await setBudget(userId, Number(month), Number(year), Number(amount))

  return res.status(200).json({ message: "Budget saved", budget })
}

export const getBudgetStatusController = async (
  req: Request,
  res: Response,
) => {
  const userId = req.userId!
  const now = new Date()
  const month = req.query.month ? Number(req.query.month) : now.getMonth() + 1
  const year = req.query.year ? Number(req.query.year) : now.getFullYear()

  const status = await getBudgetStatus(userId, month, year)

  return res.status(200).json({ message: "Budget status", status })
}
