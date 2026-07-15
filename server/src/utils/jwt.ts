import jwt from "jsonwebtoken"
import { JwtPayload } from "../constants/constants"

const secretKey = process.env.JWT_KEY!

export const generateAccessToken = async (userId: string) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "30m" })
}

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}
