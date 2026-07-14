import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) throw new Error("Auth Header not provided")

  const [bearer, token] = authHeader.split(" ")

  if (bearer !== "Bearer" || !token) throw new Error("Invalid authorization")

  const decoded = await verifyToken(token)

  if (!decoded) throw new Error("Invalid or expired token")

  req.userId = decoded.userId

  next()
}
