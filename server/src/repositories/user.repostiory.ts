import { prisma } from "../lib/prisma"

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } })
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const user = prisma.user.create({
    data: {
      name,
      email,
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })

  return user
}

export const findById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  })
}
