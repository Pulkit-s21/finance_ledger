import { Request, Response } from "express"
import { loginUser, registerUser } from "../services/auth.service"
import { findById } from "../repositories/user.repostiory"

export const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  await registerUser(name, email, password)

  return res.json(201).json({ message: "User registered" })
}

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const token = await loginUser(email, password)

  return res.status(200).json({ token })
}

export const getCurrentUserController = async (req: Request, res: Response) => {
  const user = await findById(req.userId!)

  if (!user) throw new Error("User not found")

  return res.status(200).json(user)
}
