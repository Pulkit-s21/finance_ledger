import api from "./axios"

export const registerRecord = async (data: unknown) => {
  const res = await api.post("/record/create", data)

  return res.data
}

export const getRecords = async () => {
  const res = await api.get("/record/all")

  return res.data
}
