import { createUser, findByEmail, findById } from "../repositories/user.repostiory"
import bcrypt from "bcrypt"
import { generateAccessToken } from "../utils/jwt"

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await findByEmail(email)

  if (existingUser) throw new Error("User already exists")

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await createUser(name, email, hashedPassword)

  return user
}

export const loginUser = async (email: string, password: string) => {
  const user = await findByEmail(email)

  if (!user) throw new Error("User not found")

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) throw new Error("Invalid credentails")

  const accessToken = await generateAccessToken(user.id)

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
    },
  }
}
