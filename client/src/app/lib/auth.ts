import api from "./axios"

export const createUser = async (data: unknown) => {
  const res = await api.post("/auth/register", data)

  return res.data
}

export const loginUser = async (data: unknown) => {
  const res = await api.post("/auth/login", data)

  return res.data
}
