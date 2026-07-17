import api from "./axios"

export const askQuestion = async (message: string) => {
  const res = await api.post("/chat/ask", { message })

  return res.data
}
